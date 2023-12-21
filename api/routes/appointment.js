const router = require("express").Router();
const mongoose = require('mongoose');
const Appointment = require('../models/appointmentSchema')
const PatientProfile = require('../models/patientProfile'); 
const DoctorProfile = require('../models/doctorProfile');

router.post("/create", async(req, res) => {
    try {
        // Validate patient and doctor IDs
        if (!mongoose.isValidObjectId(req.body.patientId)) {
            return res.status(400).json("Invalid patient ID");
        }
        if (!mongoose.isValidObjectId(req.body.doctorId)) {
            return res.status(400).json("Invalid doctor ID");
        }

        // Check for patient and doctor existence
        const patient = await PatientProfile.findById(req.body.patientId);
        const doctor = await DoctorProfile.findById(req.body.doctorId);
        if (!patient || !doctor) {
            return res.status(404).json("Patient or Doctor not found");
        }

        // Check if appointment already exists
        const appointmentExist = await Appointment.findOne({
            patient: req.body.patientId, 
            doctor: req.body.doctorId, 
            appointmentDate: req.body.appointmentDate, 
            appointmentTime: req.body.appointmentTime
        });
        if (appointmentExist) {
            return res.status(409).json("Appointment already exists");
        }

        // Create and save the appointment
        const appointment = new Appointment({
            patient: req.body.patientId,
            doctor: req.body.doctorId,
            appointmentDate: req.body.appointmentDate,
            appointmentTime: req.body.appointmentTime,
            consultationType: req.body.consultationType,
            notes: req.body.notes
        });
        const savedAppointment = await appointment.save();
        res.status(201).json(savedAppointment);
    }
    catch(err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
});



module.exports = router;