require("dotenv").config();
const express = require("express");
const cors = require("cors");
const initiateRoute = require("./routes/initiate");

const app = express();
app.use(cors());
app.use(express.json());

// Route for PayU initiation
const payubizRouter = require("./api/payubiz/initiate");
app.use("/api/payubiz", payubizRouter);

app.listen(4000, () => {
  console.log("🚀 Backend running at http://localhost:4000");
});
