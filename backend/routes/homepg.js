const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Event = require('../models/Event');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// ROUTE 1: Get All the Notes using: GET "/api/events/getuser". Login required
router.get('/allevents', async (req, res) => { // not user specific 
    try {
        const events = await Event.find().sort({ date: 1 });  // sort in ascending order of date
        res.json({len:events.length,events:events})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router