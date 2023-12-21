const mongoose = require('mongoose');

const doctorAvailabilitySchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorProfile',
        required: true
    },
    availableDates: [{
        date: {
            type: Date,
            required: true
        },
        timeSlots: [{
            startTime: String, // Format: 'HH:mm'
            endTime: String,   // Format: 'HH:mm'
            isBooked: {
                type: Boolean,
                default: false
            }
        }]
    }]
});

module.exports = mongoose.model('DoctorAvailability', doctorAvailabilitySchema);
