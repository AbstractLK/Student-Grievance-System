const complaintModel = require("../../models/complaintModel");
//const {model} = require("mongoose");

async function complaintUpdate(req, res) {
    const complaintId = req.params.id;
    const updatedComplaint = req.body;
    try {
        updatedComplaint.updatedAt = new Date(); // Set updatedAt to current date and time
        await complaintModel.findByIdAndUpdate(complaintId, updatedComplaint, {new: true});
        res.status(200).send('Updated !');
    } catch (e) {
        console.log(e);
        res.status(500).join({message: 'update fail'})
    }
}

module.exports = complaintUpdate;