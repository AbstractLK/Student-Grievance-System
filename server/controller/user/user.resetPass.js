const userModel = require("../../models/User");
const bcrypt = require("bcryptjs");
const codeStorage = require("../../util/codeStorage");

async function userResetPass(req, res) {
    const {email, newPass} = req.body;
    const user = await userModel.findOne({email});

    if (!user) {
        return res.status(404).send('User not found');
    }

    const encryptedPassword = await bcrypt.hash(newPass, 10);
    user.password = encryptedPassword;
    await user.save();
    codeStorage.deleteCode(email); // Remove code after successful password reset
    res.send('Password reset successfully');
}

module.exports = userResetPass;