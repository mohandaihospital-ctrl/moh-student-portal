const SibApiV3Sdk = require("sib-api-v3-sdk");

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

    const client =
      SibApiV3Sdk.ApiClient.instance;

    const apiKey =
      client.authentications["api-key"];

    apiKey.apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance =
      new SibApiV3Sdk.TransactionalEmailsApi();

    const result =
      await apiInstance.sendTransacEmail({
        sender: {
          email:
            process.env.EMAIL_USER,
          name:
            "MOH Student Portal",
        },

        to: [
          {
            email,
          },
        ],

        subject,

        htmlContent:
          html,
      });

    console.log(
      "EMAIL SENT:",
      result
    );

  } catch (error) {

    console.log(
      "EMAIL ERROR:",
      error
    );

    throw error;
  }
};

module.exports =
  sendEmail;