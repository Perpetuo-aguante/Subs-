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
      <div className="done" role="status">
        <span className="done__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 12.5 9.5 18 20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="done__text">
          <strong className="done__title">Listo, recibimos tu correo.</strong> Activamos tu
          suscripción y te avisamos a <strong>{email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Sitio web</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="sr-only" htmlFor="email">
        Correo electrónico
      </label>
      <div className="field">
        <input
          className="field__input"
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "loading"}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "email-error" : undefined}
        />

        <button className="btn" type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Enviando…" : "Activar mi regalo"}
        </button>
      </div>

      {status === "error" && (
        <p className="form__error" id="email-error" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
