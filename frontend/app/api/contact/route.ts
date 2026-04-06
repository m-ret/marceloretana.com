import { google } from "googleapis";
import { NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/lead-form";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderField(label: string, value?: string, isLink = false) {
  if (!value) return "";

  const safeValue = escapeHtml(value).replaceAll("\n", "<br>");
  const content = isLink
    ? `<a href="mailto:${safeValue}" style="color:#111827;">${safeValue}</a>`
    : safeValue;

  return `<tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
    <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">${label}</p>
    <p style="margin:4px 0 0;font-size:15px;color:#111827;line-height:1.6;">${content}</p>
  </td></tr>`;
}

async function appendToSheet(data: Record<string, string | undefined>) {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEETS_LEAD_SHEET_ID;

  if (!clientEmail || !privateKey || !sheetId) return;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Leads!A:L",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          "marceloretana.com",
          data.name,
          data.businessName || "",
          data.email,
          data.phoneOrWhatsApp || "",
          data.industry || "",
          data.projectType,
          data.budgetRange || "",
          data.timeline || "",
          data.message,
          data.locale,
          data.sourcePage,
        ],
      ],
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form payload." }, { status: 400 });
  }

  const {
    name,
    businessName,
    email,
    phoneOrWhatsApp,
    industry,
    projectType,
    budgetRange,
    timeline,
    message,
    locale,
    sourcePage,
  } = parsed.data;

  const localeLabel = locale === "cr" ? "Spanish / Costa Rica" : "English / Costa Rica";
  const subject = `New lead from ${name} via marceloretana.com (${projectType})`;

  const response = await fetch("https://www.unosend.co/api/v1/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UNOSEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Marcelo Retana <contact@marceloretana.com>",
      to: ["marcelo@gexpsoftware.com", "info@gexpsoftware.com"],
      reply_to: email,
      subject,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;max-width:600px;width:100%;">
        <tr><td style="background:#000000;padding:24px 32px;">
          <p style="margin:0;color:#ffffff;font-size:14px;letter-spacing:0.1em;text-transform:uppercase;">marceloretana.com</p>
        </td></tr>
        <tr><td style="padding:32px;">
          <h2 style="margin:0 0 24px;font-size:20px;font-weight:600;color:#111827;">New qualified inquiry</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            ${renderField("Name", name)}
            ${renderField("Business", businessName)}
            ${renderField("Email", email, true)}
            ${renderField("Phone / WhatsApp", phoneOrWhatsApp)}
            ${renderField("Industry", industry)}
            ${renderField("Project type", projectType)}
            ${renderField("Budget", budgetRange)}
            ${renderField("Timeline", timeline)}
            ${renderField("Locale", localeLabel)}
            ${renderField("Source page", sourcePage)}
            ${renderField("Message", message)}
          </table>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #f0f0f0;">
            <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#000000;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;">Reply by email</a>
          </div>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #f0f0f0;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">Sent from marceloretana.com lead form</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }),
  });

  const responseBody = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Unosend error:", response.status, responseBody);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  // Async fire-and-forget: Sheets write should not block the response
  appendToSheet({
    name,
    businessName,
    email,
    phoneOrWhatsApp,
    industry,
    projectType,
    budgetRange,
    timeline,
    message,
    locale,
    sourcePage,
  }).catch((err) => console.error("Sheets write failed:", err));

  return NextResponse.json({ success: true });
}
