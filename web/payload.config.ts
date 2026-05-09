import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor, FixedToolbarFeature, EXPERIMENTAL_TableFeature, BlocksFeature, CodeBlock } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import nodemailer from "nodemailer";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { About } from "./collections/About";
import { Blog } from "./collections/Blog";
import { Categories } from "./collections/Categories";
import { Clients } from "./collections/Clients";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";
import { adminThemePlugin } from "./src/plugins/index";
import { payloadAiPlugin } from "@ai-stack/payloadcms";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: __dirname,
    },
    meta: {
      title: 'OD-Canvas',
    },
    components: {
      graphics: {
        Icon: "./src/plugins/Logo#Icon",
      },
    },
    routes: {
      account: '/my-profile',
    },
  },
  collections: [Users, Media, Projects, Categories, Blog, Clients, About],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      BlocksFeature({
        blocks: [
          CodeBlock({
            defaultLanguage: 'ts',
            languages: {
              plaintext: 'Plain Text',
              ts: 'TypeScript',
              js: 'JavaScript',
              tsx: 'TSX',
              jsx: 'JSX',
            },
          }),
        ],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(__dirname, "src/payload-types.ts"),
  },
  email: nodemailerAdapter({
    defaultFromName: "Otherdev",
    defaultFromAddress: process.env.GMAIL_USER || "",
    transport: nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    }),
  }),
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename
            return `${process.env.R2_PUBLIC_URL}/${key}`
          },
        },
      },
      bucket: process.env.R2_BUCKET || "",
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.R2_ENDPOINT || "",
        forcePathStyle: true,
      },
    }),
    adminThemePlugin(),
    payloadAiPlugin({
      collections: {
        [About.slug]: true,
        [Blog.slug]: true,
      },
      uploadCollectionSlug: 'media',
    }),
  ],
})