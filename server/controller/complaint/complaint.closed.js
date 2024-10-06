const complaintModel = require("../../models/complaintModel");

async function closedComplaint(req, res) {
  const {role} = req.headers;
  try {
    let complaints = await complaintModel
      .find({ status: "closed" })
      .sort({ createdAt: -1 });
    if (!complaints) {
      return res.status(404).send("Complaint not found");
    }

    if (role === "admin") {
      complaints = complaints.filter(complaint => complaint.category1 === "Department Level");
    } else if (role === "facultyAdmin") {
      complaints = complaints.filter(complaint => complaint.remainingDays > -15 && complaint.category1 !== "University Level");
    } else if (role === "universityAdmin") {
      complaints = complaints.filter(
        complaint =>
          complaint.remainingDays < -15 || 
          (complaint.remainingDays >= 0 && complaint.category1 === "University Level") ||
          (complaint.remainingDays < 0 && complaint.category1 === "Faculty Level")
      );
    }

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = closedComplaint;
