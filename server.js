import express from 'express';
import { Resend } from 'resend';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3001;

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.RESEND_FROM || 'portfolio@send.ikerhdezsant.com';
const TO     = 'devikerhdez@gmail.com';

app.use(express.json());

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')));
}

// ─── Contact endpoint ────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from:    FROM,
      to:      TO,
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Contacto de ${name}`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#fff;border:1px solid #222;">
          <h2 style="color:#cc0000;border-bottom:1px solid #cc0000;padding-bottom:8px;margin-top:0;">
            Nuevo mensaje desde el portfolio
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#888;padding:4px 0;width:90px;">De:</td>
                <td style="padding:4px 0;">${name}</td></tr>
            <tr><td style="color:#888;padding:4px 0;">Email:</td>
                <td style="padding:4px 0;">
                  <a href="mailto:${email}" style="color:#cc0000;">${email}</a>
                </td></tr>
            <tr><td style="color:#888;padding:4px 0;">Asunto:</td>
                <td style="padding:4px 0;">${subject || '—'}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #333;margin:16px 0;">
          <p style="white-space:pre-wrap;line-height:1.6;margin:0;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend error]', error);
      return res.status(500).json({ error: 'Failed to send email', detail: error.message });
    }

    console.log('[Resend ok] id:', data?.id);
    return res.json({ success: true, id: data?.id });

  } catch (err) {
    console.error('[Server error]', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Catch-all: React SPA ────────────────────────────────────────────────────
app.get('{*path}', (_req, res) => {
  const indexPath = join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) res.status(404).send('Not found');
  });
});

app.listen(PORT, () => {
  console.log(`[server] running on port ${PORT} (${process.env.NODE_ENV ?? 'development'})`);
});
