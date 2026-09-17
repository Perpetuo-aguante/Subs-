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

  /** Feeds the pointer position to the button's sheen gradient. */
  function trackPointer(event: React.PointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  if (status === "success") {
    return (
      <div className="done" role="status">
        <span className="done__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 12.5 9.5 18 20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="signup__title done__title">Listo, recibimos tu correo.</h2>
        <p className="done__text">
          Activamos tu suscripción y te avisamos a <strong>{email}</strong>. Nos vemos en el
          próximo envío.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="eyebrow">Tu regalo</p>
      <h2 className="signup__title">Activa tu suscripción</h2>
      <p className="signup__note">
        Deja el correo donde quieres recibir Perpetuo. Activamos la suscripción a mano y te
        avisamos ahí mismo.
      </p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="hp" aria-hidden="true">
          <label htmlFor="website">Sitio web</label>
          <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="field">
          <label className="field__label" htmlFor="email">
            Correo electrónico
          </label>
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
        </div>

        <button
          className="btn"
          type="submit"
          disabled={status === "loading"}
          onPointerMove={trackPointer}
        >
          {status === "loading" ? "Enviando…" : "Activar mi regalo"}
        </button>

        {status === "error" && (
          <p className="form__error" id="email-error" role="alert">
            {errorMessage}
          </p>
        )}

        <p className="form__fine">
          Solo usamos tu correo para activar la suscripción y enviarte la revista.
        </p>
      </form>
    </>
  );
}
