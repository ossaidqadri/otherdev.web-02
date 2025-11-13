import { z } from "zod";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { publicProcedure, router } from "../trpc";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getGoogleAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });
  return auth;
}

async function appendToSheet(data: {
  name: string;
  companyName: string;
  email: string;
  subject: string;
  message: string;
}) {
  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const timestamp = new Date().toISOString();
  const values = [
    [
      timestamp,
      data.name,
      data.companyName,
      data.email,
      data.subject,
      data.message,
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "RAW",
    requestBody: {
      values,
    },
  });
}

async function sendEmail(data: {
  name: string;
  companyName: string;
  email: string;
  subject: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const emailContent = `
New Contact Form Submission

Name: ${data.name}
Company: ${data.companyName}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
  `.trim();

  const recipients = process.env.GMAIL_RECIPIENTS || process.env.GMAIL_USER;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: recipients,
    subject: "New Contact Form Submission",
    text: emailContent,
  });
}

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  companyName: z.string().min(1, {
    message: "Company name is required.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export const contactRouter = router({
  submit: publicProcedure
    .input(contactFormSchema)
    .mutation(async ({ input }) => {
      await Promise.all([appendToSheet(input), sendEmail(input)]);
      return { message: "Form submitted successfully" };
    }),
});
