"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function GiftForm({ initialEmail }: { initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value ?? "";

    try {
      const response = await fetch("/api/regalo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honeypot }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        setErrorMessage(data?.error ?? "Algo salió mal. Inténtalo de nuevo en un momento.");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage("No pudimos conectarnos. Inténtalo de nuevo en un momento.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p role="status">
        Listo — recibimos tu correo. Activaremos tu suscripción y te avisaremos ahí mismo.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label htmlFor="email">Correo electrónico</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        placeholder="tu@correo.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        disabled={status === "loading"}
        style={{
          display: "block",
          width: "100%",
          margin: "0.5rem 0 1rem",
          padding: "0.75rem",
          borderRadius: "8px",
          border: "1px solid var(--color-pborder)",
        }}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%",
          padding: "0.75rem",
          borderRadius: "8px",
          border: "none",
          background: "var(--color-pblue)",
          color: "#fff",
          fontWeight: 600,
          cursor: status === "loading" ? "not-allowed" : "pointer",
        }}
      >
        {status === "loading" ? "Enviando…" : "Activar mi regalo"}
      </button>

      {status === "error" && (
        <p role="alert" style={{ color: "#b00020", marginTop: "0.75rem" }}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
