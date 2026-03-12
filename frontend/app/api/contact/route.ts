import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, budget, message } = await req.json();

  if (!name || !email || !budget || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const res = await fetch("https://www.unosend.co/api/v1/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.UNOSEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Marcelo Retana <contact@marceloretana.com>",
      to: ["marcelo@gexpsoftware.com", "info@gexpsoftware.com"],
      reply_to: email,
      subject: `New message from ${name} via marceloretana.com`,
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
          <h2 style="margin:0 0 24px;font-size:20px;font-weight:600;color:#111827;">New project inquiry</h2>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Name</p>
              <p style="margin:4px 0 0;font-size:15px;color:#111827;">${name}</p>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Email</p>
              <p style="margin:4px 0 0;font-size:15px;color:#111827;"><a href="mailto:${email}" style="color:#111827;">${email}</a></p>
            </td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
              <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Budget</p>
              <p style="margin:4px 0 0;font-size:15px;color:#111827;">${budget}</p>
            </td></tr>
            <tr><td style="padding:12px 0;">
              <p style="margin:0;font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Message</p>
              <p style="margin:4px 0 0;font-size:15px;color:#111827;line-height:1.6;">${message.replace(/\n/g, "<br>")}</p>
            </td></tr>
          </table>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #f0f0f0;">
            <a href="mailto:${email}" style="display:inline-block;background:#000000;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;">Reply to ${name}</a>
          </div>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #f0f0f0;">
          <p style="margin:0;font-size:12px;color:#9ca3af;">Sent from marceloretana.com contact form</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
    }),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("Unosend error:", res.status, body);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  console.log("Unosend response:", res.status, body);
  return NextResponse.json({ success: true });
}
