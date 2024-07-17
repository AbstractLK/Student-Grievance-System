const getAll = require('./user.getAll');
const registration = require('./user.registration');
const userDelete = require('./user.delete');
const update = require('./user.update');
const login = require('./user.login');
const changePass = require('./user.changePass');
const userSendCode = require('./user.sendCode');
const verifyCode = require('./user.verifyCode');

module.exports = {
    getAll,
    registration,
    userDelete,
    update,
    login,
    changePass,
    userSendCode,
    verifyCode
}