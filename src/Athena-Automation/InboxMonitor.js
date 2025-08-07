import express from 'express';
import { routeCommand } from './CommandRouter.js';

const router = express.Router();

router.post('/webhook/inbox', (req, res) => {
  const { subject, body } = req.body;
  const combinedText = `${subject}\n${body}`;

  if (combinedText.includes('::COMMAND::')) {
    const commandText = combinedText.split('::COMMAND::')[1].trim();
    routeCommand(commandText);
  }

  res.status(200).send('✅ Webhook received');
});

export function startInboxMonitor(app) {
  app.use(express.json()); // Ensure JSON middleware
  app.use('/', router);    // Mount this router on main app
}