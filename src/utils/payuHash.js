// utils/payuHash.js
import sha512 from 'crypto-js/sha512';

export function generatePayUHash({
  key,
  txnid,
  amount,
  productinfo,
  firstname,
  email,
  salt,
}) {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return sha512(hashString).toString();
}

export function launchPayU({ amount, plan, user }) {
  const txnid = `Txn${Date.now()}`;
  const data = {
    key: 'Pnw2e6',
    txnid,
    amount: amount.toString(),
    productinfo: plan,
    firstname: user?.name || 'Student',
    email: user?.email || 'student@example.com',
    salt: 'Kuc61tjuatcFWUiKCvDqjlPwHBrMRUYK',
  };

  const hash = generatePayUHash(data);
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://secure.payu.in/_payment';

  const fields = {
    key: data.key,
    txnid: data.txnid,
    amount: data.amount,
    productinfo: data.productinfo,
    firstname: data.firstname,
    email: data.email,
    phone: user?.phone || '',
    surl: 'https://entrance-adda.com/payment-success',
    furl: 'https://entrance-adda.com/payment-failure',
    hash,
  };

  Object.entries(fields).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}