const router = require("express").Router();
const mongoose = require('mongoose');
const Appointment = require('../models/appointmentSchema')
const PatientProfile = require('../models/patientProfile'); 
const DoctorProfile = require('../models/doctorProfile');

router.post("/create", async(req, res) => {
    try {
        // Validate patient and doctor IDs
        if (!mongoose.isValidObjectId(req.body.patient)) {
            return res.status(400).json("Invalid patient ID");
        }
        if (!mongoose.isValidObjectId(req.body.doctor)) {
            return res.status(400).json("Invalid doctor ID");
        }

        // Check for patient and doctor existence
        const patient = await PatientProfile.findById(req.body.patient);
        const doctor = await DoctorProfile.findById(req.body.doctor);
        // patint did not exist
        if (!patient) {
            return res.status(404).json("Patient not found");
        }
        // doctor did not exist
        if (!doctor) {
            return res.status(404).json("Doctor not found");
        }

        // Check if appointment already exists
        const appointmentExist = await Appointment.findOne({
            patient: req.body.patient, 
            doctor: req.body.doctor, 
            appointmentDate: req.body.appointmentDate, 
            appointmentTime: req.body.appointmentTime
        });
        if (appointmentExist) {
            return res.status(409).json("Appointment already exists");
        }

        // Create and save the appointment
        const appointment = new Appointment({
            patient: req.body.patient,
            doctor: req.body.doctor,
            appointmentDate: req.body.appointmentDate,
            appointmentTime: req.body.appointmentTime,
            appointmentDay: req.body.appointmentDay,
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

// getting user appointments by patient ID
router.get("/getpatientappointment/:patientId", async (req, res) => {
    try {
      const appointments = await Appointment.find({ patient: req.params.patientId })
        .populate({
          path: 'doctor',
          select: 'userId', // Specify the 'userId' field to populate for 'doctor'
          populate: {
            path: 'userId',
            select: 'firstName lastName profilePicture' // Specify the fields to populate for 'userId'
          }
        }).populate({
          path: 'patient',
          select: 'user', // Specify the 'user' field to populate for 'patient'
          populate: {
            path: 'user',
            select: 'firstName lastName profilePicture' // Specify the fields to populate for 'user'
          }
        })
        .sort({ appointmentDate: 1, appointmentTime: 1 });
      res.status(200).json(appointments);
    } catch(err) {
      res.status(500).json({ message: "An error occurred", error: err.message });
    }
  });


module.exports = router;