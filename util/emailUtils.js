const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

module.exports.sendCode = async (email, code) => {
    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is ${code}`
    });
};
