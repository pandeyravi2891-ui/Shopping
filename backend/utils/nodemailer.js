const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const signinmail = async (firstName, lastName, email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Welcome to our platform",
      text: `Hello ${firstName} ${lastName}, Thank you for registering with us! Your OTP is: ${otp}`,
    });

    console.log("Mail sent:", info.messageId);
  } catch (error) {
    console.log(error);
  }
};



const loginmail = async (firstName, lastName, email) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Welcome to our platform",
      text: `Hello ${firstName} ${lastName}, Thank you for login with us!`,
    });

    console.log("Mail sent:", info.messageId);
  } catch (error) {
    console.log(error);
  }
};

const forgotpasswordmail = async (firstName, lastName, email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SENDER_MAIL,
      to: email,
      subject: "Welcome to our platform",
      text: `Hello ${firstName} ${lastName},Requesting a password reset! Your OTP is: ${otp}`,
    });

    console.log("Mail sent:", info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { signinmail, loginmail, forgotpasswordmail };