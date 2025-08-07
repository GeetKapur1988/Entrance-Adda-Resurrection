import express from 'express';
import sendTempPassword from './routes/send-temp-password';

const app = express();
app.use('/api/send-temp-password', sendTempPassword);
app.use(express.json());

// Wire up routes
app.use('/api/send-temp-password', sendTempPassword);

// Start the server
app.listen(3000, () => {
  console.log('✅ Express API server running on http://localhost:3000');
});