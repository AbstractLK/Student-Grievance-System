const jwt = require("jsonwebtoken");
const complaintDB = require('../../data/complaint.db');

async function submitComplaint(req, res) {
    // res.send('kay');
    const data = req.body;
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send("please sign in before access this resource!");
    }
    try {
        req.user = jwt.verify(token, process.env.JWT_SECURITY_KEY);
        // console.log(req.body);
        // res.status(200).json({message: 'kay', data: req.body});
        const savedComplaint = await complaintDB.insertComplaint(data);
        res.status(200).json({message: 'kay', data: savedComplaint});
    } catch (e) {
        return res.status(400).send("Fail to insert the complaint!");
    }
}

module.exports = submitComplaint;