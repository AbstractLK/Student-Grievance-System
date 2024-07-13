const express = require('express');
const router = express.Router();
const complaintController = require('../controller/complaint');


router.post('/submit-complaint', complaintController.submitComplaint);
router.get('/getAllComplaint', complaintController.getAllComplaint);
router.get('/getOneComplaint/:id', complaintController.getOneComplaint);
router.get('/notProcessedComplaint', complaintController.notProcessedComplaint);

// router.get('/getStudentComplaint', (req, res) => {
//     res.send('User complaint!');
// });



module.exports = router;