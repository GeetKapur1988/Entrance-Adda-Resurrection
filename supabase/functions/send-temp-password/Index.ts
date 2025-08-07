import express from 'express';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password, name } = req.body;

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email }],
          subject: 'Your Entrance Adda Login Password',
        },
      ],
      from: {
        email: 'noreply@entranceadda.com',
        name: 'Entrance Adda',
      },
      content: [
        {
          type: 'text/plain',
          value: `Hi ${name},\n\nYour temporary password is: ${password}\nLogin: https://entranceadda.com/login`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return res.status(500).json({ success: false, error: await response.text() });
  }

  res.json({ success: true });
});

export default router;
