const cron = require('node-cron');
const complaintModel = require('../models/complaintModel');

// Schedule a job to run every day at midnight
cron.schedule('53 23 * * *', async () => {
    try {
        console.log('Running daily job to update remaining days');
        const complaints = await complaintModel.find();
        const today = new Date();

        complaints.forEach(async (complaint) => {
            const registrationDate = new Date(complaint.createdAt);
            const remainingDays = 15 - Math.floor((today - registrationDate) / (1000 * 60 * 60 * 24));

            if (remainingDays !== complaint.remainingDays) {
                complaint.remainingDays = remainingDays;
                console.log(complaint.remainingDays);
                await complaint.save();
            }
        });

        console.log('Remaining days updated for all complaints');
    } catch (error) {
        console.error('Error updating remaining days:', error);
    }
});
