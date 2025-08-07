// Example sandbox hash string generator (Node backend preferred)
const crypto = require('crypto');

function generateHash({ key, txnid, amount, productinfo, firstname, email, salt }) {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
}