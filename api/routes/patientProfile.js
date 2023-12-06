const router = require('express').Router();
const PatientProfile = require('../models/patientProfile');
const mongoose = require('mongoose');
const User = require('../models/user');

// Route to create patient profile if the user is a patient and the profile does not exist
router.post('/create', async(req, res) => {
    try {
        // validate user
        if (!mongoose.isValidObjectId(req.body.user)) {
            return res.status(400).json("Invalid user ID");
        }
        const userinfo = await User.findById(req.body.user);
        if (!userinfo) {
            return res.status(404).json("User not found");
        }
        if (userinfo.userType !== 'patient') {
            return res.status(403).json("Access denied: User is not a patient");
        }
        const patientProfileExist = await PatientProfile.findOne({ user: req.body.user });
        if (patientProfileExist) {
            return res.status(409).json("Patient profile already exists");
        }

        const patientProfile = new PatientProfile({
            user: req.body.user,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            contactNumber: req.body.contactNumber,
            address: req.body.address,
            medicalHistory: req.body.medicalHistory,
            currentMedications: req.body.currentMedications,
            allergies: req.body.allergies,
            emergencyContact: req.body.emergencyContact,
            profilePicture: req.body.profilePicture
        });


        const savedPatientProfile = await patientProfile.save();
        // Update user profileCreated field
        userinfo.profileCreated = true;
        await userinfo.save();
        res.status(201).json(savedPatientProfile);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
        console.log(err);
    }
});

// Route to get patient profile by patient ID
router.get('/:patientId', async(req, res) => {
    try {
        // validate patient ID
        if (!mongoose.isValidObjectId(req.params.patientId)) {
            return res.status(400).json("Invalid patient ID");
        }
        const patientProfile = await PatientProfile.findOne({ user: req.params.patientId }).populate('user', 'firstName lastName email');
        if (!patientProfile) {
            return res.status(404).json("Patient profile not found");
        }
        res.status(200).json(patientProfile);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
        console.log(err);
    }
});

module.exports = router;
