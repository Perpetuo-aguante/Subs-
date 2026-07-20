import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  if (
    typeof body !== "object" ||
    body === null ||
    !("url" in body) ||
    typeof (body as { url?: unknown }).url !== "string"
  ) {
    return NextResponse.json({ ok: false, error: "Falta la URL" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
