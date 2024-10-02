const Chatbox = require('../../models/chatboxModel');

async function sendMessage(req, res) {
    const {complaintID, message, userRole, email} = req.body;

    try {
        const chatbox = await Chatbox.findOne({complaintID});

        if (chatbox) {
            chatbox.messages.push({userRole, email, message});
            await chatbox.save();
        } else {
            const newChatbox = new Chatbox({
                complaintID,
                messages: [{userRole, email, message}]
            });
            await newChatbox.save();
        }

        res.status(200).json({success: true, message: 'Message sent!'});
    } catch (err) {
        res.status(500).json({success: false, message: 'Server error', error: err.message});
    }
}

module.exports = sendMessage;