const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Notes using: GET "/api/events/getuser". Login required
router.get('/allevents', async (req, res) => { // fetchuser required ?
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/searchevents/:title', async (req, res) => {
    try {
        const events = await Event.find({ title: req.params.title }).sort({ date: 1 });
        res.json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/addfilters', fetchuser, async (req, res) => {     // req body should have a filters field.
    try {
        const result = await User.updateOne({ favourites : req.body.filters });

    if (result.nModified === 1) {
        console.log('User updated successfully!');
        }   
    else {
        console.log('User update failed.');
        }
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/filteredevents', fetchuser, async (req, res) => {   // req should have a filters field
    try {
        const events = await Event.find({ tag: req.body.filters }).sort({ date: 1 });
        res.json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router