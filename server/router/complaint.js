const express = require('express');
const router = express.Router();
const complaintController = require('../controller/complaint');


router.post('/submit-complaint', complaintController.submitComplaint);
router.get('/getAllComplaint', complaintController.getAllComplaint);
router.get('/getOneComplaint/:id', complaintController.getOneComplaint);
router.get('/notProcessedComplaint', complaintController.notProcessedComplaint);
router.get('/inProcessedComplaint', complaintController.inProcessedComplaint);
router.get('/closedComplaint', complaintController.closedComplaint);
router.put('/update-complaint/:id',complaintController.updateComplaint);
router.post('/sendMessage',complaintController.sendMessage);
router.get('/getMessages/:complaintID',complaintController.getMessage);
router.get('/report',complaintController.getReport);

// router.get('/getStudentComplaint', (req, res) => {
//     res.send('User complaint!');
// });



module.exports = router;