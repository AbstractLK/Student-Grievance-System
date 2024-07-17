const codeStorage = require('../../util/codeStorage');

function verifyCode(req, res) {
    const { email, code } = req.body;
    const storedCode = codeStorage.getCode(email);
    console.log(`Email: ${email}, Code in Storage: ${storedCode}, Submitted Code: ${code}`);
    // console.log(codeStorage.getCode(email));

    if (storedCode !== parseInt(code)) {
        return res.status(400).send('Invalid code');
        // return res.status(200).json(codeStorage.getCode(email));
    }

    res.send('Code verified');
}

module.exports = verifyCode;