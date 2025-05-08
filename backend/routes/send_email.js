const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.HP_EMAIL,
      pass: process.env.HP_PASSWORD,
    },
  });
};

const sendEmail = async (to, subject, text) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.HP_EMAIL,
    to: to,
    subject: subject,
    text: text,
  };

  return transporter.sendMail(mailOptions);
};

const sendApprovalEmail = async (email) => {
  return sendEmail(
    email,
    "HappyPaws Shelter Approval",
    `Your shelter registration has been approved! You can now log in to your account.

- The HappyPaws Team`
  );
};

const sendRejectionEmail = async (email) => {
  return sendEmail(
    email,
    "HappyPaws Shelter Registration Status",
    `We regret to inform you that your shelter registration has been rejected.
    
If you have any questions, please contact our support team.

- The HappyPaws Team`
  );
};

const sendActivationEmail = async (email) => {
  return sendEmail(
    email,
    "HappyPaws Shelter Account Activated",
    `Good news! Your shelter account has been activated. You can now log in and access all features.

- The HappyPaws Team`
  );
};

const sendDeactivationEmail = async (email) => {
  return sendEmail(
    email,
    "HappyPaws Shelter Account Deactivated",
    `Your shelter account has been deactivated. 
    
If you have any questions, please contact our support team.

- The HappyPaws Team`
  );
};

const sendShelterRegistrationEmail = async (email) => {
  return sendEmail(
    email,
    "HappyPaws Account Registration Received",
    `Thank you for registering with HappyPaws!

Your account registration has been received and is currently under review by our admin team. You will receive a confirmation email once your account has been approved.

Thank you for your patience!
- The HappyPaws Team`
  );
};

const sendEmployeeRegistrationEmail = async (email) => {
  return sendEmail(
    email,
    "New Employee Approval Confirmation - HappyPaws Account",
    `A new employee account has been successfully registered and is awaiting approval. Please visit the User Management menu to review and approve the account.

Thank you for your attention.
- The HappyPaws Team`
  );
};

module.exports = {
  sendShelterRegistrationEmail,
  sendEmployeeRegistrationEmail,
  sendApprovalEmail,
  sendRejectionEmail,
  sendActivationEmail,
  sendDeactivationEmail,
};
