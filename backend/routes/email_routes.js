const express = require("express");
const router = express.Router();
const {
  sendShelterRegistrationEmail,
  sendEmployeeRegistrationEmail,
  sendResetLinkEmail,
  sendSuccessResetPassword,
  sendApprovalEmail,
  sendRejectionEmail,
  sendActivationEmail,
  sendDeactivationEmail,
  sendOwnerRegistrationEmail,
} = require("./send_email");
const dotenv = require("dotenv");

dotenv.config();

router.post("/email_register_all", async (req, res) => {
  try {
    const { email } = req.body;
    await sendShelterRegistrationEmail(email);
    res.status(200).json({
      message: "Registration email sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send registration email" });
  }
});

router.post("/email_register_employee", async (req, res) => {
  try {
    const { email } = req.body;
    await sendEmployeeRegistrationEmail(email);
    res.status(200).json({
      message: "Employee registration email sent successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to send employee registration email" });
  }
});

router.post("/email_register_owner", async (req, res) => {
  try {
    await sendOwnerRegistrationEmail(process.env.HP_EMAIL);
    res.status(200).json({
      message: "Owner registration notification sent to admin email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send notification email" });
  }
});

router.post("/email_reset_password", async (req, res) => {
  try {
    const { email, resetLink } = req.body;
    await sendResetLinkEmail(email, resetLink);
    res.status(200).json({
      message: "User reset password email sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send user reset email" });
  }
});

router.post("/email_reset_password_success", async (req, res) => {
  try {
    const { email } = req.body;
    await sendSuccessResetPassword(email);
    res.status(200).json({
      message: "User reset password email sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to sent reset password email" });
  }
});

router.post("/email_approval", async (req, res) => {
  try {
    const { email } = req.body;
    await sendApprovalEmail(email);
    res.status(200).json({ message: "Approval email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send approval email" });
  }
});

router.post("/email_rejection", async (req, res) => {
  try {
    const { email } = req.body;
    await sendRejectionEmail(email);
    res.status(200).json({ message: "Rejection email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send rejection email" });
  }
});

router.post("/email_activation", async (req, res) => {
  try {
    const { email } = req.body;
    await sendActivationEmail(email);
    res.status(200).json({ message: "Activation email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send activation email" });
  }
});

router.post("/email_deactivation", async (req, res) => {
  try {
    const { email } = req.body;
    await sendDeactivationEmail(email);
    res.status(200).json({ message: "Deactivation email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to send deactivation email" });
  }
});

module.exports = router;
