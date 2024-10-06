const userModel = require("../../models/User");
const { sendEmail } = require("../../util/emailUtils");
const codeStorage = require("../../util/codeStorage");
//const transporter = require("../../util/emailUtils");

async function userSendCode(req, res) {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).send("Email not found");
  }

  const code = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
  codeStorage.setCode(email, code);

  const emailContent = `Your password reset code is ${code}`;
  const subject = "Password Reset Code";

  //   const mailOptions = {
  //     from: process.env.GMAIL_USER,
  //     to: email,
  //     subject: "Password Reset Code",
  //     text: emailContent,
  //   };
  //await transporter.sendEmail(mailOptions);

  await sendEmail(email, subject, emailContent);
  // console.log(`Code set for ${email}: ${code}`);
  // console.log(codeStorage.getCode(email));
  res.send("Code sent");
}

module.exports = userSendCode;
