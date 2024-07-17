const userModel = require("../../models/User");
const {sendCode} = require("../../util/emailUtils");
const codes = require('../../util/globalVariables');

async function userSendCode(req, res) {
    const {email} = req.body;
    const user = await userModel.findOne({email});

    if (!user) {
        return res.status(404).send('Email not found');
    }

    const code = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit code
    codes[email] = code;

    await sendCode(email, code);
    res.send('Code sent');
}

module.exports = userSendCode;