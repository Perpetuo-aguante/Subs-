import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
  icons: { icon: "/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#f9f6f1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
