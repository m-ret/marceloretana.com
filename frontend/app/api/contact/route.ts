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
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
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
