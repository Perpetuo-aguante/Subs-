# Perpetuo — gifted-subscription landing page

This app is a single page: a public, branded landing at `/` for recipients of a
gifted Perpetuo subscription. They enter their email, the form POSTs to
`/api/regalo`, which validates the input and forwards it to an n8n webhook.
Tomás activates the subscription manually from there — this repo does not store
signups or send any confirmation email.

### Design

One screen, nothing else: logotype, headline, a line of copy, the "Cada semana"
rotator and the email field. Keep it that way — no extra sections.

The look follows the 2026 brand book (Materia Prima Estudio). Its five colours
(A1 blue `#074690`, A2 red `#e2543b`, A3 lime `#c3d73a`, A4 ink `#0d1114`,
A5 paper `#faf6f1`) and the type and spacing tokens live in the `:root` block at
the top of `src/app/globals.css`; nothing downstream hardcodes a colour.

| Piece | File |
| --- | --- |
| PERPETUO logotype with the punto on the T (live text in Archivo 900) | `src/app/Wordmark.tsx` |
| The punto mascot, also used as the headline's full stop and the favicon | `src/app/Punto.tsx`, `public/punto.svg` |
| Cycling word in "Cada semana, …" | `src/app/WordRotator.tsx` |
| Email form | `src/app/GiftForm.tsx` |

The logotype and punto are approximations drawn in code; swap in the official
SVGs from the brand book when they're available. Every animation has a
`prefers-reduced-motion` path that keeps the finished state.

### Env var

Set `GIFT_WEBHOOK_URL` (see `.env.example`) to the n8n webhook URL, both locally
(`.env.local`) and in the Vercel project's environment variables. If it's unset,
`/api/regalo` fails soft with a Spanish error message and forwards nothing.

### Webhook payload shape

`/api/regalo` POSTs this JSON body to `GIFT_WEBHOOK_URL`:

```json
{
  "email": "persona@example.com",
  "source": "regalo-landing",
  "submittedAt": "2026-07-20T12:00:00.000Z"
}
```

The n8n workflow (Webhook trigger → Data Table row → Slack notification) is
built against this shape.
