const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Event = require('../models/Event');
// const superadmin = require('../models/superadmin');

router.get('/seerequests', async (req, res) => {
    try {
        const events = await Event.find({reqsp:true});

        res.json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
 }
})

router.get('/alltheevents', async (req, res) => { // fetchuser required ?
  try {
      const events = await Event.find().sort({ date: 1 });
      res.json(events)
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})


router.put('/approveevent/:id',  async (req, res) => {
    
    try {
        const newEvent = {};
        let event = await Event.findById(req.params.id);
        if (!event) { return res.status(404).send("Not Found") }
     newEvent.title = event.title ;
      newEvent.description = event.description ;
    newEvent.tag = event.tag ;
       newEvent.startTime = event.startTime;
      newEvent.endTime = event.endTime;

        newEvent.isspecial = true;
        newEvent.reqsp = false;
        newEvent.like = event.like;
        event = await Event.findByIdAndUpdate(req.params.id, { $set: newEvent }, { new: true })
        
        res.json({ event });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.put('/denyevent/:id',  async (req, res) => {
    
    try {
        const newEvent = {};
        let event = await Event.findById(req.params.id);
        if (!event) { return res.status(404).send("Not Found") }
     newEvent.title = event.title ;
      newEvent.description = event.description ;
    newEvent.tag = event.tag ;
       newEvent.startTime = event.startTime;
      newEvent.endTime = event.endTime;

        newEvent.isSpecial = false;
        newEvent.reqsp = false;
        newEvent.like = event.like;
        event = await Event.findByIdAndUpdate(req.params.id, { $set: newEvent }, { new: true })
        res.json({ event });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;