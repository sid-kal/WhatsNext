const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const nodemailer = require("nodemailer");

// ROUTE 1: Get All the Events using: GET "/api/events/getuser". Login required
router.get('/fetchallevents', fetchuser, async (req, res) => {
    try {
        const events = await Event.find({ user: req.user.id });
        res.json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Event using: POST "/api/events/addevent". Login required
router.post('/addevent', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            let success = false;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let clash2 = await Event.find({ startTime: { $lt: req.body.endTime, $ne: req.body.startTime }, endTime: { $gt: req.body.endTime } });
            //let clash3 = await Event.find({ endTime:{$gt : req.body.endTime}, startTime:{$lt: req.body.startTime}});
            let clash4 = await Event.find({ endTime: { $lt: req.body.endTime, $gt: req.body.startTime }, startTime: { $ne: req.body.startTime } });
            let clash5 = await Event.find({ startTime: { $eq: req.body.startTime }, endTime: { $ne: req.body.endTime } });
            let clash6 = await Event.find({ startTime: { $ne: req.body.startTime }, endTime: { $eq: req.body.endTime } });
            let clash7 = await Event.find({ startTime: { $eq: req.body.startTime }, endTime: { $eq: req.body.endTime } });
            let clashtmp = clash2.concat(clash4.concat(clash5.concat(clash6.concat(clash7))));

            // let clashtmp = clash5.concat(clash6.concat(clash7.concat(clash4)));
            let clash = clashtmp.filter((item,
                index) => clashtmp.indexOf(item) === index);
            // const userfound = await User.findById(req.user.id);
            // // console.log("teure")
            // const event = new Event({
            //     title, description, tag, startTime,endTime,reqsp,like,image:image, user: req.user.id,organiser:userfound.name
            // })
            // console.log("erjuhru")
            // let savedEvent = {};
            if (clash.length !== 0) {
                warning = `Event Clashes with the following events:\n`;
            }
            else {
                success = true;
            }
            res.json({ success, warning, clash });

        } catch (error) {
            console.error(error.message);
            res.status(500).send(error);
        }
    })

router.post('/addeventfinally', fetchuser, async (req, res) => {
    try {
        // console.log("fesee")
        const { title, description, tag, startTime, endTime, reqsp, image, venue } = req.body;
        const like = 0;
        
        const userfound = await User.findById(req.user.id);
        // // console.log("teure")
        const event = new Event({
            title, description, tag, startTime, endTime, reqsp, like, image: image, user: req.user.id, organiser: userfound.name, venue:venue
        })
        const savedEvent = await event.save();
        // console.log("erjuhru")
        // let savedEvent = {};
        res.json({ savedEvent });

    } catch (error) {
        console.error(error.message);
        res.status(500).send(error);
    }
})


// ROUTE 3: Update an existing Event using: PUT "/api/events/updateevent". Login required
router.put('/updateevent/:id', fetchuser, async (req, res) => {
    const { title, description, tag, startTime, endTime, reqsp } = req.body;
    try {
        // Create a newNote object
        const newEvent = {};
        if (title) { newEvent.title = title };
        if (description) { newEvent.description = description };
        if (tag) { newEvent.tag = tag };
        if (startTime) { newEvent.startTime = startTime };
        if (endTime) { newEvent.endTime = endTime };
        if (reqsp) { newEvent.reqsp = reqsp };
        // Find the note to be updated and update it
        let event = await Event.findById(req.params.id);
        if (!event) { return res.status(404).send("Not Found") }

        if (event.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        newEvent.like = event.like;
        event = await Event.findByIdAndUpdate(req.params.id, { $set: newEvent }, { new: true })
        res.json({ event });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 4: Delete an existing Event using: DELETE "/api/events/deleteevent". Login required
router.delete('/deleteevent/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let event = await Event.findById(req.params.id);
        if (event) {
            if (event.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed");
            }

            event = await Event.findByIdAndDelete(req.params.id)
            return res.json({ "Success": "Event has been deleted", event: event });
        }

        // Allow deletion only if user owns this Note

        return res.status(404).send("Not Found")
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchallusers', async (req, res) => {
    try {
        const users = await User.find({wantnotification: true});
        res.json(users)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.post('/sendnotification', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'talingupta0@gmail.com',
                pass: 'vlswzmjbmrsqksew'
            }
        })
        transporter.sendMail({
            from: 'talingupta0@gmail.com',
            to: req.body.email,
            subject: 'Event added',
            html: `<p>Dear User,</p>
                   <p>A new event has been added:</p>
                   <ul>
                     <li><strong>Title:</strong> ${req.body.event.title}</li>
                     <li><strong>Organizer:</strong> ${req.body.event.organiser}</li>
                     <li><strong>Start Time:</strong> ${new Date(req.body.event.startTime)}</li>
                     <li><strong>End Time:</strong> ${new Date(req.body.event.endTime)}</li>
                   </ul>
                   <p>Thank you for using our service.</p>
                   <p>Team WhatsNext</p>`,
            function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            }
        });
        return res.json({ msg: "sent" })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})
module.exports = router