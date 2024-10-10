const userDB = require('../../data/user.db');
// const token = require('./generateToken');

async function registerUser(req, res) {
    const data = req.body;
    const isExist = await userDB.isExist(data.email);
    if (isExist) {
        console.log('Already registered');
        res.send(!isExist);
        // res.send(data);
    }else {
        try {
            const savedUser = await userDB.insert(data);
            res.status(200).json({message: 'User created successfully', data: data});
            console.log('User created successfully');
        } catch (error) {
            console.log(error+' ');
            res.status(400).json({message: 'user registration failed !'});
        }
    }
}


module.exports = registerUser;