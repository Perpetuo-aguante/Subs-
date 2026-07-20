import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBHOOK_TIMEOUT_MS = 8000;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }

  const { email, website } = body as { email?: unknown; website?: unknown };

  // Honeypot: bots fill this hidden field. Pretend success without forwarding anything.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json({ ok: false, error: "Ingresa un correo válido" }, { status: 400 });
  }

  const webhookUrl = process.env.GIFT_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "No pudimos procesar tu solicitud. Inténtalo de nuevo más tarde." },
      { status: 500 }
    );
  }

  const payload = {
    email: normalizedEmail,
    source: "regalo-landing",
    submittedAt: new Date().toISOString(),
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!webhookResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "No pudimos procesar tu solicitud. Inténtalo de nuevo más tarde." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "No pudimos procesar tu solicitud. Inténtalo de nuevo más tarde." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
