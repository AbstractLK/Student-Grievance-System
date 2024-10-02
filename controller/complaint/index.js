const getAllComplaint = require("./complaint.getAll");
const submitComplaint = require('./complaint.submit');
const getOneComplaint = require('./complaint.getOne');
const notProcessedComplaint = require('./complaint.notProcess');
const inProcessedComplaint = require('./complaint.inProcess');
const closedComplaint = require('./complaint.closed');
const updateComplaint = require('./complaint.update');
const sendMessage = require('./complaint.sendMessage');
const getMessage = require('./complaint.getMessages');
const getReport = require('./complaint.getReport');

module.exports = {
    getAllComplaint,
    submitComplaint,
    getOneComplaint,
    notProcessedComplaint,
    inProcessedComplaint,
    closedComplaint,
    updateComplaint,
    sendMessage,
    getMessage,
    getReport
};