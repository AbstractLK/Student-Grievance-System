const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
// const jwt = require("jsonwebtoken");


//post method
router.get('/dashboard',(req,res)=>{
    res.send('User Dashboard!');
    console.log("user dashboard");
});

router.post('/submit-complaint', userController.submitComplaint);

module.exports = router;