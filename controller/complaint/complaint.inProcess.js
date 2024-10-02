const complaintModel = require("../../models/complaintModel");

async function inProcessedComplaint(req, res) {
  // res.send('okays');
  try {
    const complaint = await complaintModel
      .find({ status: "in process" })
      .sort({ createdAt: -1 });
    if (!complaint) {
      return res.status(404).send("Complaint not found");
    }
    res.status(200).json(complaint);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = inProcessedComplaint;
