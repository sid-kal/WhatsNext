const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// ROUTE 1: Get All the Notes using: GET "/api/events/getuser". Login required
router.get('/allevents', async (req, res) => { // not user specific 
    try {
        const now = new Date();
        // console.log(now.toLocaleTimeString())
        console.log(now)
        //const currentTime = now.toLocaleTimeString();
        let event = {};
        
        const outdated = await Event.find({ endTime:{$lt : now}});
        for(let i=0;i<outdated.length;i++){
            console.log(outdated[i]);
            event = await Event.findByIdAndDelete(outdated[i]._id);
        }
        var events = await Event.find().sort({ endTime: 1 });  // sort in ascending order of date
        // for(let i=0;i<events.length;i++){
        //     event = Event.findByIdAndDelete(outdated[i]._id);
        // // }
        // console.log(events.length)
        // console.log(events[0].endTime)
        // console.log(events[0].endTime < now.toLocaleTimeString())
        // while(events.length > 0 && events[0].endTime < now){
        //     console.log(events.length )
        //     events = Event.findByIdAndDelete(events[0]._id);
        // }
        res.json({len:events.length,events:events})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router