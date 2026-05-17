# Google Sheets Lead Capture Setup

This guide sets up Google Sheets as the lead database for the ElevenLabs agent.

---

## Step 1: Create the Leads Sheet

1. Go to [Google Sheets](https://sheets.google.com) → Create new spreadsheet
2. Name it: **Other Dev Leads**
3. Rename the first sheet tab to: **Leads**

---

## Step 2: Add Column Headers

In row 1 of the sheet, add these headers exactly as shown:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Role | Company | Pain Point | Timeline | Booking Ref | Source |

---

## Step 3: Enable Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project (or use existing)
3. Search for **Google Sheets API** → Enable it
4. Also enable **Google Drive API** (needed for sheet access)

---

## Step 4: Create a Service Account

1. Go to **IAM & Admin** → **Service Accounts** → **Create Service Account**
2. Name it: `otherdev-leads-writer`
3. Grant roles: **Editor** (or **Storage Object Admin** if using GCS)
4. After creation: go to the service account → **Keys** → **Add Key** → **JSON**
5. Download the JSON file — this is your credentials file

---

## Step 5: Share the Sheet with the Service Account

1. Open your Google Sheet
2. Click **Share** → Add the service account email: `otherdev-leads-writer@YOUR-PROJECT.iam.gserviceaccount.com`
3. Give them **Editor** access

---

## Step 6: Set Environment Variables

Add these to `web/.env.local`:

```env
GOOGLE_CLIENT_EMAIL=otherdev-leads-writer@YOUR-PROJECT.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
GOOGLE_LEADS_SHEET_ID=your-sheet-id-here
```

### Finding the Sheet ID

The Sheet ID is in the URL:
`https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`

Copy the long string after `/d/` and before `/edit`.

---

## Step 7: Verify

Test the connection by calling the lead capture endpoint:

```bash
curl -X POST http://localhost:3000/api/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "CEO",
    "company": "Test Corp",
    "pain_point": "Building a new website",
    "timeline": "1-3 months",
    "source": "test"
  }'
```

You should see the row appear in your Google Sheet.

---

## Notes

- The `GOOGLE_PRIVATE_KEY` must have `\n` replaced with actual newlines, or use the JSON directly
- Rate limiting: 20 requests/minute per IP (via Upstash Redis)
- If you see "Permission denied" — double check the service account has Editor access to the sheet