"use client";

import { useState, type FormEvent } from "react";
import { sendContactMessage } from "@/lib/actions/send-contact-message";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

/** Les erreurs de validation arrivent sous la forme "champ: message; champ: message" : on garde les messages. */
const readable = (message: string) =>
  message
    .split("; ")
    .map((part) => part.replace(/^[a-z]+:\s*/i, ""))
    .join(" ");

/**
 * Formulaire de contact de la fin de bande. Le backend est la Server Action
 * sendContactMessage (ServerPatterns) : elle renvoie toujours { success, data | error }.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: "sending" });

    const result = await sendContactMessage({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    });

    if (result.success) {
      form.reset();
      setStatus({ kind: "sent" });
    } else {
      setStatus({ kind: "error", message: readable(result.error.message) });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="tp-form-done" role="status">
        <p className="tp-form-done-title">
          <span aria-hidden className="tp-rec-dot" /> Message enregistré.
        </p>
        <p className="tp-form-note">Je te réponds par email, en général sous 48 h.</p>
        <button type="button" className="tp-btn" onClick={() => setStatus({ kind: "idle" })}>
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form className="tp-form" onSubmit={onSubmit} noValidate aria-describedby="tp-form-status">
      <div className="tp-form-row">
        <label className="tp-field">
          <span className="tp-field-label">Nom</span>
          <input name="name" autoComplete="name" required minLength={2} maxLength={80} className="tp-input" />
        </label>
        <label className="tp-field">
          <span className="tp-field-label">Email</span>
          <input name="email" type="email" autoComplete="email" required maxLength={160} className="tp-input" />
        </label>
      </div>
      <label className="tp-field">
        <span className="tp-field-label">Ton projet</span>
        <textarea name="message" required minLength={10} maxLength={2000} rows={4} className="tp-input tp-textarea" />
      </label>

      {/* Champ piège : caché aux humains et aux lecteurs d'écran, souvent rempli par les robots */}
      <div className="tp-hp" aria-hidden>
        <label>
          Site web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="tp-form-foot">
        <button type="submit" className="tp-btn tp-btn--rec" disabled={sending}>
          <span aria-hidden className="tp-rec-dot" /> {sending ? "Envoi…" : "Envoyer"}
        </button>
        <p id="tp-form-status" className="tp-form-note" role={status.kind === "error" ? "alert" : undefined}>
          {status.kind === "error" ? <span className="tp-form-error">{status.message}</span> : null}
        </p>
      </div>
    </form>
  );
}
