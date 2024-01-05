const router = require("express").Router();
const mongoose = require('mongoose');
const DoctorAvailability = require('../models/doctorAvailabilitySchema')
const DoctorProfile = require('../models/doctorProfile');
const Appointment = require('../models/appointmentSchema');
const User = require('../models/user');

// create doctor availability
router.post("/create", async(req, res) => {
    try {
        // Validate doctor ID
        if (!mongoose.isValidObjectId(req.body.doctorId)) {
            return res.status(400).json("Invalid doctor ID");
        }

        // Check for doctor existence on user schema and user type is doctor
        const doctor = await DoctorProfile.findOne({ _id: req.body.doctorId });
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
        // add visit duration
        doctorAvailability.visitDuration = req.body.visitDuration;

        await doctorAvailability.save();
        res.status(200).json(doctorAvailability);

    } catch(err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
});

// function to cretae time slot base on start time and end time and visit duration
function createTimeSlots(startTimeStr, endTimeStr, visitDurationStr,day) {
    // Prepend a standard date to ensure correct parsing
    const baseDate = "2000-01-01 "; // Arbitrary date
    const startTime = new Date(baseDate + startTimeStr).getTime();
    const endTime = new Date(baseDate + endTimeStr).getTime();
    const visitDuration = parseInt(visitDurationStr) * 60000; // Convert minutes to milliseconds

    const timeSlots = [];
    let currentTime = startTime;
    const days = getNextNWeekdayDates(day);
    while (currentTime < endTime) {
        timeSlots.push(new Date(currentTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        currentTime += visitDuration;
    }
    // map throw all days and add time slot to each day base on all time slots
    let allTimeSlots = [];
    days.map(day => {
        let daySlots = timeSlots.map(time => ({
            day: day,
            time: time
        }));
        allTimeSlots = allTimeSlots.concat(daySlots);
    });

    return allTimeSlots;
}

function getNextNWeekdayDates(dayName) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const targetDay = daysOfWeek.findIndex(day => day.toLowerCase() === dayName.toLowerCase());
  
    if (targetDay === -1) {
      throw new Error("Invalid day name");
    }
  
    const nextDates = Array.from({ length: 12 }, (_, i) => {
      const today = new Date();
      today.setDate(today.getDate() + (targetDay + 7 - today.getDay()) % 7 + i * 7);
      return today.toISOString().substring(0, 10);
    });
  
    return nextDates;
  }

// getting all doctors availability
router.get("/getall", async (req, res) => {
    try {
      const doctorAvailability = await DoctorAvailability.find()
        .populate({
          path: 'doctorId',
          select: 'userId',
          populate: {
            path: 'userId',
            select: 'firstName lastName',
          },
        })
        .lean()
        .exec();

      // Generate time slots for each doctor's availability

      
      for (const doctor of doctorAvailability) {
            const appointment = await Appointment.find({ doctor: doctor.doctorId._id,  }).lean().exec();
   
            for (const dayAvailability of doctor.weeklyAvailability) {
            dayAvailability.timeSlots = createTimeSlots(dayAvailability.start, dayAvailability.end, doctor.visitDuration.toString(), dayAvailability.day);
            dayAvailability.timeSlots = dayAvailability.timeSlots.filter(timeSlot => {
                const appointmentTime = appointment.find(appointment => appointment.appointmentDate === timeSlot.day && appointment.appointmentTime === timeSlot.time);
                return !appointmentTime;
            });
            
            }

        }

          

      res.status(200).json(doctorAvailability);
    } catch (err) {
      res.status(500).json({ message: "An error occurred", error: err.message });
    }
});


module.exports = router;