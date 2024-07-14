const mongoose = require('mongoose');
const { Schema } = mongoose;

const complaintSchema = new Schema({
    complainantEmail: {
        type: String,
        required: true
    },
    remark: {
        type: String,
    },
    category1: {
        type: String,
        // enum: ['Department Level', 'Faculty Level', 'Institution Level'], // Example categories
        required: true,
    },
    department: {
        type: String,
        // enum: ['Applied Computing', 'Mathematics', 'Physics', 'Chemistry'], // Example departments
        required: true,
    },
    type: {
        type: String,
        // enum: ['Lecture', 'Lab', 'Seminar', 'Other'], // Example types
        required: true,
    },
    year: {
        type: [String],
        // enum: ['year1', 'year2', 'year3', 'year4'], // Example years
        required: true,
    },
    complaintDescription: {
        type: String,
        required: true,
    },
    anonymous: {
        type: String,
        enum: ['anonymous', 'not anonymous'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        required: true,
        default: 'not process'
    },
    remainingDays: {
        type: String,
        default: '15 Days'
    }
});

complaintSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Complaint = mongoose.model('complaint', complaintSchema);

module.exports = Complaint;
