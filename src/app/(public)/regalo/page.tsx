import type { Metadata } from "next";
import { GiftForm } from "./GiftForm";

export const metadata: Metadata = {
  title: "Tu suscripción de regalo a Perpetuo",
  description: "Dejanos tu correo y activamos tu suscripción de regalo a Perpetuo — sin tarjeta, sin pasos extra.",
};

export default async function RegaloPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div className="card" style={{ maxWidth: "420px", width: "100%" }}>
        <h1 style={{ color: "var(--color-pblue)", marginTop: 0 }}>
          Tu suscripción de regalo a Perpetuo
        </h1>
        <p>
          Dejanos tu correo y activamos tu suscripción — sin tarjeta, sin pasos extra.
        </p>
        <GiftForm initialEmail={email ?? ""} />
      </div>
    </div>
  );
}
