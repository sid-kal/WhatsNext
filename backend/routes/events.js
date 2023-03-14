const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');


function checkClash ( date1s, date1e, date2s, date2e) {
    return (date1s <= date2e && date1s >= date2s) || (date1e <= date2e && date1e >= date2s) ||(date2s <= date1e && date2s >= date1s) || (date2e <= date1e && date2e >= date1s);
}
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
            const { title, description, tag, startTime, endTime, reqsp} = req.body;
            const like = 0;
            let success = false;
            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            
            let clash1 = await Event.find({ startTime:{$gte : req.body.startTime , $lte : req.body.endTime}});
            let clash2 = await Event.find({ endTime:{$gte : req.body.startTime , $lte : req.body.endTime}});
            let clash3 = await Event.find({ endTime:{$gte : req.body.startTime}, startTime:{$lte: req.body.startTime}});
            let clash4 = await Event.find({ endTime:{$gte : req.body.endTime}, startTime:{$lte: req.body.endTime}});
            // console.log(clash);
            // let clash = [...new Set([...clash1, ...clash2, ...clash3, ...clash4])];
            let clashtmp = clash1.concat(clash2.concat(clash3.concat(clash4)));
            let clash = clashtmp.filter((item, 
                index) => clashtmp.indexOf(item) === index);
            const event = new Event({
                title, description, tag, startTime,endTime,reqsp,like, user: req.user.id
            })
            const savedEvent = await event.save()
            if(clash.length !== 0){
                    warning = `Event Clashes with the following events:\n`;
            }
            else{
                success = true;
            }
            res.json({success, warning, clash, savedEvent});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Event using: PUT "/api/events/updateevent". Login required
router.put('/updateevent/:id', fetchuser, async (req, res) => {
    const { title, description, tag, startTime, endTime,reqsp } = req.body;
    try {
        // Create a newNote object
        const newEvent = {};
        if (title) { newEvent.title = title };
        if (description) { newEvent.description = description };
        if (tag) { newEvent.tag = tag };
        if (startTime) {newEvent.startTime = startTime};
        if(endTime) {newEvent.endTime = endTime};
        if(reqsp) {newEvent.reqsp = reqsp};
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