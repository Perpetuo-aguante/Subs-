# Perpetuo — gifted-subscription landing page

This app is a single page: a public, branded landing at `/` for recipients of a
gifted Perpetuo subscription. They enter their email, the form POSTs to
`/api/regalo`, which validates the input and forwards it to an n8n webhook.
Tomás activates the subscription manually from there — this repo does not store
signups or send any confirmation email.

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
