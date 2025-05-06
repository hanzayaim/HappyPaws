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

router.post("/email_approval", async (req, res) => {
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
      subject: "Your Shelter Registration Has Been Approved",
      text: `Congratulations! Your shelter registration with HappyPaws has been approved.

You can now log in to your account and start using our services.

Thank you for joining HappyPaws!
- The HappyPaws Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Approval email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send approval email" });
  }
});

router.post("/email_rejection", async (req, res) => {
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
      subject: "Your Shelter Registration Status",
      text: `We regret to inform you that your shelter registration with HappyPaws has been rejected.

If you believe this was a mistake or would like more information, please contact our support team.

- The HappyPaws Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Rejection email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send rejection email" });
  }
});

router.post("/email_activation", async (req, res) => {
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
      subject: "Your Shelter Account Has Been Reactivated",
      text: `Your HappyPaws shelter account has been reactivated.

You can now log in and resume using our services.

Thank you for being part of HappyPaws!
- The HappyPaws Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Activation email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send activation email" });
  }
});

router.post("/email_deactivation", async (req, res) => {
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
      subject: "Your Shelter Account Has Been Deactivated",
      text: `Your HappyPaws shelter account has been deactivated.

If you believe this was done in error or have any questions, please contact our support team.

- The HappyPaws Team`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Deactivation email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send deactivation email" });
  }
});

module.exports = router;
