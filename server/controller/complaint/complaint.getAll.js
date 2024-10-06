const complaintModel = require("../../models/complaintModel");
const jwt = require("jsonwebtoken");

async function getAllComplaint(req, res) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // res.status(200).send(token);
  if (!token) {
    return res.send("please sign in before access this resource!");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECURITY_KEY);
    const userEmail = user.email;
    // console.log(userEmail);

    // Fetch complaints for the user
    const complaints = await complaintModel
      .find({ complainantEmail: userEmail })
      .sort({ createdAt: -1 }); // Sort in descending order (-1 for descending, 1 for ascending)

    if (complaints.length === 0) {
      return res.send("No complaints found for this user.");
    }

    res.status(200).send(complaints);
  } catch (e) {
    return res.status(401).send("invalid access token!");
  }

  // res.json({message: 'Student Complaints'});
  // res.send('User complaints!');
}

module.exports = getAllComplaint;
