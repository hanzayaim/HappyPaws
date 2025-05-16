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

const createEmailTemplate = (
  greeting,
  message,
  callToAction = "",
  footer = ""
) => {
  return `
Dear User,

${greeting}

${message}

${callToAction ? `${callToAction}\n\n` : ""}Thank you for choosing HappyPaws!
${footer ? `${footer}\n\n` : ""}
Best regards,
The HappyPaws Team
`;
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

const sendShelterRegistrationEmail = async (email) => {
  const body = createEmailTemplate(
    "Thank you for registering with HappyPaws!",
    "Your account registration has been received and is currently under review by our admin team. You will receive a confirmation email once your account has been approved.",
    "We appreciate your patience during this process."
  );

  return sendEmail(email, "HappyPaws Account Registration Received", body);
};

const sendOwnerRegistrationEmail = async (email) => {
  const body = createEmailTemplate(
    "Important Notice:",
    "A new Shelter account has been successfully registered and is awaiting approval.",
    "Please visit the User Management menu to review and approve the account."
  );

  return sendEmail(email, "HappyPaws Account Registration Received", body);
};

const sendEmployeeRegistrationEmail = async (email) => {
  const body = createEmailTemplate(
    "Important Notice:",
    "A new employee account has been successfully registered and is awaiting approval.",
    "Please visit the User Management menu to review and approve the account."
  );

  return sendEmail(
    email,
    "New Employee Approval Confirmation - HappyPaws Account",
    body
  );
};

const sendResetLinkEmail = async (email, resetLink) => {
  const body = createEmailTemplate(
    "You have requested to reset your HappyPaws account password.",
    `Please click on the following link to reset your password:\n${resetLink}`,
    "If you did not request this password reset, please ignore this email or contact support if you have concerns."
  );

  return sendEmail(email, "HappyPaws Reset Password Request", body);
};

const sendSuccessResetPassword = async (email) => {
  const body = createEmailTemplate(
    "Your password has been successfully reset!",
    "You can now log in to your account with your new password.",
    "If you did not make this change, please contact our support team immediately."
  );

  return sendEmail(email, "HappyPaws Password Reset Successful", body);
};

const sendApprovalEmail = async (email) => {
  const body = createEmailTemplate(
    "Great news!",
    "Your shelter registration has been approved!",
    "You can now log in to your account and start using our platform."
  );

  return sendEmail(email, "HappyPaws Shelter Approval", body);
};

const sendRejectionEmail = async (email) => {
  const body = createEmailTemplate(
    "We have reviewed your application.",
    "We regret to inform you that your shelter registration has been rejected.",
    "If you have any questions or would like to know more about our requirements, please contact our support team."
  );

  return sendEmail(email, "HappyPaws Shelter Rejection", body);
};

const sendActivationEmail = async (email) => {
  const body = createEmailTemplate(
    "Good news!",
    "Your shelter account has been activated.",
    "You can now log in and access all features of our platform."
  );

  return sendEmail(email, "HappyPaws Shelter Account Activated", body);
};

const sendDeactivationEmail = async (email) => {
  const body = createEmailTemplate(
    "Account Status Update:",
    "Your shelter account has been deactivated.",
    "If you have any questions or believe this was done in error, please contact our support team."
  );

  return sendEmail(email, "HappyPaws Shelter Account Deactivated", body);
};

module.exports = {
  sendShelterRegistrationEmail,
  sendOwnerRegistrationEmail,
  sendEmployeeRegistrationEmail,
  sendResetLinkEmail,
  sendSuccessResetPassword,
  sendApprovalEmail,
  sendRejectionEmail,
  sendActivationEmail,
  sendDeactivationEmail,
};
