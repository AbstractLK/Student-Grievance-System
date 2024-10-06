const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    userRole: {required:true, type: String},
    email: {required:true, type: String},
    message: {required:true, type: String},
    timestamp: { type: Date, default: Date.now } // Adding timestamp
})

const chatboxSchema = new Schema({
    complaintID: { type: String, required: true },
    messages: [messageSchema]
});

const chatboxModel = mongoose.model('chatbox',chatboxSchema);
module.exports = chatboxModel;
