import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";

import "./globals.css";

// Variable font: one file covers the 400 body and the 900 display weight.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perpetuo — Tu suscripción de regalo",
  description:
    "Alguien te regaló una suscripción a Perpetuo, la revista en español del siglo XXI. Deja tu correo para activarla.",
  openGraph: {
    title: "Perpetuo — Tu suscripción de regalo",
    description:
      "Alguien te regaló una suscripción a Perpetuo, la revista en español del siglo XXI.",
    locale: "es_ES",
    type: "website",
  },
  icons: { icon: "/punto.svg" },
};

export const viewport: Viewport = {
  themeColor: "#faf6f1",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
