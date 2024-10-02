const Chatbox = require('../../models/chatboxModel');

async function getMessages(req, res) {
    const {complaintID} = req.params;

    try {
        const chatbox = await Chatbox.findOne({complaintID});

        if (chatbox) {
            res.status(200).json(chatbox.messages);
        } else {
            res.status(404).json({message: 'No messages found for this complaint.'});
        }
    } catch (err) {
        res.status(500).json({success: false, message: 'Server error', error: err.message});
    }
}

module.exports = getMessages;