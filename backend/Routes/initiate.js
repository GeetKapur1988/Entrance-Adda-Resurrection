const express = require("express");
const crypto = require("crypto");
require("dotenv").config();

const router = express.Router();

router.post("/initiate", async (req, res) => {
  try {
    const {
      txnid,
      amount,
      firstname,
      email,
      phone,
      productinfo,
    } = req.body;

    const key = process.env.VITE_PAYUBIZ_KEY;
    const salt = process.env.VITE_PAYUBIZ_SALT;

    console.log("TXNID received:", txnid);

    if (!txnid || !amount || !firstname || !email || !productinfo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    return res.json({ hash, txnid }); // ✅ return txnid here
  } catch (err) {
    console.error("💥 Error generating hash:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;