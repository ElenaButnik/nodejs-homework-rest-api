const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');

const dotenv = require("dotenv");

dotenv.config();
// require("dotenv").config();

const { DB_HOST, META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'butnik.elena@mate.ua',
    pass: META_PASSWORD
  }
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const mail = {
  to: "homir30401@runchet.com",
  from: "butnik.elena@mate.ua",
  subject: "New letter",
  html: "New order",
};

transporter.sendMail(mail)
.then(() => console.log("Email send is sucess"))
.catch((error) => console.log(error.message));

// const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error.message));

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
