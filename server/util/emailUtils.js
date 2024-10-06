const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASS,
  },
});

//module.exports = transporter;

module.exports.sendEmail = (email, subject, content) => {
  transporter.sendMail({
    from: {
      name: "SGHS Alerts",
      address: process.env.GMAIL_ADDRESS,
    },
    to: email,
    subject: subject,
    text: content,
  });
};
