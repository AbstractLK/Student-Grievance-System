const complaintModel = require('../../models/complaintModel');

async function getReport(req, res) {
    try {
        const {startDate, endDate} = req.query;

        // Validate the dates
        if (!startDate || !endDate) {
            return res.status(400).json({message: 'Start date and end date are required.'});
        }

        // Fetch complaints within the date range
        const complaints = await complaintModel.find({
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        });

        res.json({complaints});
    } catch (error) {
        res.status(500).json({message: 'An error occurred while fetching complaints.', error});
    }
}

module.exports = getReport;