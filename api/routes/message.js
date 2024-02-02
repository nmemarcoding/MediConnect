const route = require('express').Router();
const User = require('../models/user');
const Message = require('../models/messageSchema');
const mongoose = require('mongoose');

// create message
route.post('/create', async(req, res) => {
    if (!mongoose.isValidObjectId(req.body.sender)) {
        return res.status(400).json("Invalid sender ID");
    }
    if (!mongoose.isValidObjectId(req.body.receiver)) {
        return res.status(400).json("Invalid receiver ID");
    }

    try{
        const sender = await User.findById(req.body.sender);
        if (!sender) {
            return res.status(404).json("Sender not found");
        }
        const receiver = await User .findById(req.body.receiver);
        if (!receiver) {
            return res.status(404).json("Receiver not found");
        }
        const message = new Message({
            sender: req.body.sender,
            receiver: req.body.receiver,
            messageContent: req.body.messageContent,
            attachments: req.body.attachments
        });
        const savedMessage = await message.save();
        res.status(201).json(savedMessage);



    }
    
    catch(err){
            res.status(500).json({ message: "An error occurred", error: err.message });
        }
    
});

// get massage base on sender and receiver
route.get('/get/:sender/:receiver', async(req, res) => {
    const { sender, receiver } = req.params;

    if (!mongoose.isValidObjectId(sender) || !mongoose.isValidObjectId(receiver)) {
        return res.status(400).json("Invalid sender or receiver ID");
    }

    try {
        // Find messages where the current user is either the sender or the receiver
        // and the other user is either the receiver or the sender
        const messages = await Message.find({
            $or: [
                { $and: [{ sender: sender }, { receiver: receiver }] },
                { $and: [{ sender: receiver }, { receiver: sender }] }
            ]
        });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
});


module.exports = route;