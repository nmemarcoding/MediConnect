const route = require('express').Router();
const User = require('../models/user');
const DoctorProfile = require('../models/doctorProfile');
const mongoose = require('mongoose');

// create doctor profile

route.post('/create', async(req, res) => {
    //  user id validation
    if (!mongoose.isValidObjectId(req.body.userId)) {
        return res.status(400).json("Invalid user ID");
    }
    try{
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        if (user.userType !== 'doctor') {
            return res.status(403).json("Access denied: User is not a doctor");
        }
        const doctorProfileExist = await DoctorProfile.findOne({ userId: req.body.userId });
        if (doctorProfileExist) {
            return res.status(409).json("Doctor profile already exists");
        }
        
        const doctorProfile = new DoctorProfile({
            userId: req.body.userId,
            specializations: req.body.specializations,
            qualifications: req.body.qualifications,
            experience: req.body.experience,
            bio: req.body.bio,
            languages: req.body.languages,
            consultationFees: req.body.consultationFees,
            consultationTypes: req.body.consultationTypes,
            profilePicture: req.body.profilePicture
        });
        const savedDoctorProfile = await doctorProfile.save();
        // Update user profileCreated field
        user.profileCreated = true;
        await user.save();
        // now find the doctor profile and add doctor id to user schema
        const doctorProfile2 = await DoctorProfile.findOne({ userId: req.body.userId });
        user.patientId= doctorProfile2._id;
        await user.save();
        res.status(201).json(savedDoctorProfile);
    }catch(err){
        res.status(500).json({ message: "An error occurred", error: err.message });
        console.log(err);
    }

});





module.exports = route;