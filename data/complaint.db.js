const complaintModel = require('../models/complaintModel')
async function insertComplaint(data, user) {
    console.log(data);
    const complaint = {
        complainantEmail: user.email,
        remark: '',
        category1: data.category1,
        department: data.department,
        type: data.type,
        year: data.year,
        complaintDescription: data.complaintDescription,
        anonymous: data.anonymous,
        status: 'not process',
        remainingDate: '15 Days'
    };

    const savedComplaint = await complaintModel.create(complaint);
    return (savedComplaint);

    // return (complaint);
}

let complaintDB = {
    insertComplaint
}

Object.freeze(complaintDB);
module.exports = complaintDB;