const getAllComplaint = require("./complaint.getAll");
const submitComplaint = require('./complaint.submit');
const getOneComplaint = require('./complaint.getOne');
const notProcessedComplaint = require('./complaint.notProcess');

module.exports = {
    getAllComplaint,
    submitComplaint,
    getOneComplaint,
    notProcessedComplaint
};