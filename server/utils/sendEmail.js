const nodemailer = require("nodemailer");

const sendEmail = async (
  email,
  subject,
  html
) => {

  try {

    console.log(
      "Sending email to:",
      email
    );

    const transporter =
      nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        family: 4,

        auth: {
          user:
            process.env.EMAIL_USER,
          pass:
            process.env.EMAIL_PASS,
        },
      });

    const info =
      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,
        to: email,
        subject,
        html,
      });

    console.log(
      "EMAIL SENT:",
      info.messageId
    );

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error
    );

    throw error;
  }
};

module.exports = sendEmail;