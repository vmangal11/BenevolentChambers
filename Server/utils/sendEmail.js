// utils/sendEmail.js

const nodemailer = require("nodemailer");
require("dotenv").config(); // Ensure this is at the top to load environment variables

const sendEmail = async (email, subject, text) => {
  try {
    // Configure the transporter using the service name from the .env file.
    // This is more reliable than manually setting host and port for common services.
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: `<p>Please use the following link to reset your password:</p><p>${text}</p>`,
    });

    console.log("Email sent successfully.");
  } catch (err) {
    console.error("Email not sent:", err.message);
    // Log the full error to get more details
    console.error(err);
  }
};

module.exports = sendEmail;
