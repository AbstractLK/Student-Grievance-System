const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../../models/User");

async function changePass(req, res) {
    const {currentPass, newPass} = req.body;
    const token = req.body.token || req.query.token || req.headers['x-access-token'];


    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECURITY_KEY);
        const userId = decoded.id;
        // res.status(200).json({currentPass: currentPass, newPass: newPass, token: token, userId: userId});

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const validPassword = await bcrypt.compare(currentPass, user.password);

        if (!validPassword) {
            return res.send('Invalid current password');
        }

        const encryptedPassword = await bcrypt.hash(newPass, 10);

        user.password = encryptedPassword;
        await user.save();

        res.send('Password changed successfully');
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}

module.exports = changePass;