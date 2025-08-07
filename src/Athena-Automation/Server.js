import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { routeCommand } from './CommandRouter.js';
import dotenv from 'dotenv';
dotenv.config(); // ✅ Ensures .env is loaded once globally

const app = express();
const PORT = 9000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/command', async (req, res) => {
  const { commandText } = req.body;
  console.log('🧠 Received Command:', commandText);

  if (!commandText) {
    console.log('❌ Missing commandText in payload:', req.body);
    return res.status(400).json({ error: 'Missing commandText' });
  }

  try {
    const result = await routeCommand(commandText);
    return res.status(200).json({ message: result || 'Command executed successfully' });
  } catch (error) {
    console.error('🔥 Error executing command:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Athena Automation listening at http://localhost:${PORT}`);
});