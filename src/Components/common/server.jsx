// server.js
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ Replace with your actual keys
const MERCHANT_KEY = 'gtKFFx'; // sandbox
const SALT = 'eCwWELxi';      // sandbox

app.post('/generate-hash', async (req, res) => {
  const { email, name, userId, plan, amount, txnid } = req.body;

  const data = `${MERCHANT_KEY}|${txnid}|${amount}|${plan}|${name}|${email}|||||||||||${SALT}`;
  const hash = crypto.createHash('sha512').update(data).digest('hex');

  res.json({ hash });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🔐 PayU Hash server running at http://localhost:${PORT}`));