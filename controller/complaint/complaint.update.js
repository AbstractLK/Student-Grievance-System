const complaintModel = require("../../models/complaintModel");
const { sendEmail } = require("../../util/emailUtils");
//const {model} = require("mongoose");

async function complaintUpdate(req, res) {
  const complaintId = req.params.id;
  const updatedComplaint = req.body;

  const email = req.body.complainantEmail;
  const subject = "Complaint Status Update";
  const emailContent = `Your complaint with ID ${complaintId} has been updated. Please login to check the status.`;
  //console.log(updatedComplaint);

  try {
    updatedComplaint.updatedAt = new Date(); // Set updatedAt to current date and time
    await complaintModel.findByIdAndUpdate(complaintId, updatedComplaint, {
      new: true,
    });
    await sendEmail(email, subject, emailContent);
    res.status(200).send("Updated !");
  } catch (e) {
    console.log(e);
    res.status(500).join({ message: "update fail" });
  }
}

module.exports = complaintUpdate;
