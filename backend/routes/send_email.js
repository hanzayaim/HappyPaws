const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

router.post("/email_register_all", async (req, res) => {
  try {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.HP_EMAIL,
        pass: process.env.HP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.HP_EMAIL,
      to: email,
      subject: "HappyPaws Account Registration Received",
      text: `Thank you for registering with HappyPaws!

Your account registration has been received and is currently under review by our admin team. You will receive a confirmation email once your account has been approved.

Thank you for your patience!
- The HappyPaws Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/email_register_employee", async (req, res) => {
  try {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.HP_EMAIL,
        pass: process.env.HP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.HP_EMAIL,
      to: email,
      subject: "New Employee Approval Confirmation - HappyPaws Account",
      text: `A new employee account has been successfully registered and is awaiting approval. Please visit the User Management menu to review and approve the account.

Thank you for your attention.
- The HappyPaws Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
