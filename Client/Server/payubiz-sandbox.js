// payubiz-sandbox.js
// This file will serve as the mock payment request handler (to be replaced with live keys post approval)

import crypto from 'crypto';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Use test credentials for PayUbiz sandbox
const config = {
  merchantKey: 'gtKFFx', // PayUbiz test key
  salt: 'eCwWELxi',      // PayUbiz test salt
  baseURL: 'https://test.payu.in/_payment'
};

app.post('/api/payubiz/initiate', (req, res) => {
  const { txnid, amount, productinfo, firstname, email } = req.body;

  const hashString = `${config.merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${config.salt}`;
  const hash = crypto.createHash('sha512').update(hashString).digest('hex');

  res.json({
    success: true,
    url: config.baseURL,
    params: {
      key: config.merchantKey,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone: req.body.phone,
      surl: 'https://yourdomain.com/payment-success',
      furl: 'https://yourdomain.com/payment-failed',
      hash
    }
  });
});

// ✅ Callback handler (for testing only)
app.post('/api/payubiz/callback', (req, res) => {
  console.log('Received PayUbiz Callback:', req.body);
  res.status(200).send('Callback received');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ PayUbiz Sandbox server running on port ${PORT}`));