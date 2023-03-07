const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');
const readline = require("readline");
const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ROUTE 1: Get All the Notes using: GET "/api/events/getuser". Login required
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
            const { title, description, tag, date} = req.body;
            let success = false;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            let clash = await Event.find({ date: req.body.date });
            // console.log(clash);
            let warning = "All fine"
            const event = new Event({
                title, description, tag, date, user: req.user.id
            })
            const savedEvent = await event.save()
            if(clash){
                    warning = `Event Clashes with the following events:\n`;
            }
            res.json({success, warning, clash, savedEvent});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Event using: PUT "/api/events/updateevent". Login required
router.put('/updateevent/:id', fetchuser, async (req, res) => {
    const { title, description, tag, date } = req.body;
    try {
        // Create a newNote object
        const newEvent = {};
        if (title) { newEvent.title = title };
        if (description) { newEvent.description = description };
        if (tag) { newEvent.tag = tag };
        if (date) {newEvent.date = date};
        // Find the note to be updated and update it
        let event = await Event.findById(req.params.id);
        if (!event) { return res.status(404).send("Not Found") }

        if (event.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
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
        if (!event) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (event.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        event = await Event.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Event has been deleted", event:event });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router