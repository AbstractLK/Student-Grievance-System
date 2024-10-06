const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
// const complaintController = require('../controller/complaint')
// const jwt = require("jsonwebtoken");

router.put("/change-password", userController.changePass);
router.post("/send-code", userController.userSendCode);
router.post("/verify-code", userController.verifyCode);
router.post("/reset", userController.userResetPass);
router.put("/update-user/:id", userController.update);
router.get("/getAll", userController.getAll);

//post method
// router.get('/dashboard',(req,res)=>{
//     res.send('User Dashboard!');
//     console.log("user dashboard");
// });

// router.post('/submit-complaint', userController.submitComplaint);
// router.get('/get-complaint', (req, res) => {
//    res.status(200).send('Welcome to the Grievance System');
// });
// router.get('/get-complaint', complaintController.getStudentComplaint);

module.exports = router;
