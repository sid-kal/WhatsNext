const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Event = require('../models/Event');
const fetchuser = require('../middleware/fetchuser');
const fetchevent = require('../middleware/fetchevent');

//Get request for liked events
router.get('/showlikedevents',fetchuser,async (req,res) => {
    try{
        const user = await User.findById(req.user.id);
        const likedEvents = await Event.findById({ $in: user.likedEvents });
        res.json(likedEvents);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Post request for liking an event
router.post('/likeevent',fetchuser,async(req,res) => {
    // console.log("API Called");
    try{
       const likeexists = await User.find({_id: req.user.id,likedEvents: {$elemMatch: {$eq : req.body.eventID}}});
       if (likeexists.length > 0)
       {
            await User.findByIdAndUpdate(req.user.id,{$pull: {likedEvents: req.body.eventID}});
            await Event.findByIdAndUpdate(req.body.eventID, { $inc: { like: -1 } });
            res.json({id:"wave"});
       }
       else
       {
            await User.findByIdAndUpdate(req.user.id,{$push: {likedEvents: req.body.eventID}});
            await Event.findByIdAndUpdate(req.body.eventID, { $inc: { like: 1 } });
            res.json({id:"gtkwave"});
       }
    }
    catch (error)
    {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router