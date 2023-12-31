const mongoose = require('mongoose');

const doctorAvailabilitySchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorProfile',
        required: true
    },
    weeklyAvailability: [{
        day: {
            type: String, // e.g., 'Monday', 'Tuesday', etc.
            required: true
        },
        start: {
            type: String, // Time format: 'HH:mm', e.g., '09:00'
            required: true
        },
        end: {
            type: String, // Time format: 'HH:mm', e.g., '15:00'
            required: true
        }
    }],
    visitDuration: {
        type: Number, // In minutes
        default: 30
    }
});

module.exports = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);
