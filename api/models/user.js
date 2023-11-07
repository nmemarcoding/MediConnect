const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 1,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    rule:{
        enum: ['doctor', 'patient'],
        type: String,
        default: 'patient'
    },
    
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.membershipNumber) {
        const lastUser = await mongoose.model('User').findOne().sort('-membershipNumber');  // Find the user with the highest membershipNumber
        if (!lastUser) {
            // No users in the database, start from 10000000
            this.membershipNumber = 12345678;
        } else {
            this.membershipNumber = lastUser.membershipNumber + 1;
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
