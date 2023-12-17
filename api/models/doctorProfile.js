const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    specializations: [{
        type: String,
        default: ''
    }],
    qualifications: [{
        degree: { type: String, default: '' },
        institution: { type: String, default: '' },
        year: { type: Number, default: null }
    }],
    experience: {
        type: Number, // years of experience
        default: 0
    },
    bio: {
        type: String,
        max: 1000,
        default: ''
    },
    languages: [{
        type: String,
        default: ''
    }],
    availability: [{
        day: { type: String, default: '' },
        startTime: { type: String, default: '' }, // could be in HH:mm format
        endTime: { type: String, default: '' }
    }],
    consultationFees: {
        type: Number,
        default: 0
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating',
        default: []
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        default: []
    }],
    consultationTypes: [{
        type: String,
        enum: ['video', 'audio', 'chat'],
        default: 'chat'
    }],
    profilePicture: {
        type: String, // URL to the image
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);
