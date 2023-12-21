const router = require("express").Router();
const mongoose = require('mongoose');
const DoctorAvailability = require('../models/doctorAvailabilitySchema')
const DoctorProfile = require('../models/doctorProfile');
const Appointment = require('../models/appointmentSchema');

// create doctor availability
router.post("/create", async(req, res) => {
    try {
        // Validate doctor ID
        if (!mongoose.isValidObjectId(req.body.doctorId)) {
            return res.status(400).json("Invalid doctor ID");
        }

        // Check for doctor existence
        const doctor = await DoctorProfile.findById(req.body.doctorId);
        if (!doctor) {
            return res.status(404).json("Doctor not found");
        }

        // Find or create the doctor availability document
        let doctorAvailability = await DoctorAvailability.findOne({ doctorId: req.body.doctorId });
        if (!doctorAvailability) {
            doctorAvailability = new DoctorAvailability({ doctorId: req.body.doctorId });
        }

        // Update the weekly availability
        req.body.weeklyAvailability.forEach(newDayAvailability => {
            const existingDayIndex = doctorAvailability.weeklyAvailability.findIndex(
                day => day.day === newDayAvailability.day
            );

            if (existingDayIndex !== -1) {
                // Update existing day availability
                doctorAvailability.weeklyAvailability[existingDayIndex] = newDayAvailability;
            } else {
                // Add new day availability
                doctorAvailability.weeklyAvailability.push(newDayAvailability);
            }
        });

        await doctorAvailability.save();
        res.status(200).json(doctorAvailability);

    } catch(err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
});



// const appointmentExist = await Appointment.findOne({
//     doctor: req.body.doctorId,
//     appointmentDate: req.body.day,
//     appointmentTime: req.body.start
// });
// if (appointmentExist) {
//     return res.status(409).json("Doctor is booked on this date and time");
// }

module.exports = router;