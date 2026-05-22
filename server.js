import express from 'express';
import { Resend } from 'resend';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: 'devikerhdez@gmail.com',
      subject: subject || 'Contacto Portfolio',
      replyTo: email,
      html: `
        <h2>Nuevo mensaje del portfolio</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject || 'Contacto Portfolio'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'dist')));
  app.get('{*path}', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
