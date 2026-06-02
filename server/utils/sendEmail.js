const nodemailer = require("nodemailer");

const sendEmail = async (
  email,
  subject,
  html
) => {
  const transporter =
  nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  });
};

module.exports = sendEmail;