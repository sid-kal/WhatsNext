const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Event = require('../models/Event');
const fetchuser = require('../middleware/fetchuser');
//const fetchevent = require('../middleware/fetchevent');

//Get request for liked events
router.get('/showlikedevents', fetchuser, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        // const likedEvents = await Event.findById({ $in: user.likedEvents });
        const likedEvents = await Event.find({ _id: { $in: user.likedEvents } });  // get events in liked list
        res.json({ id: likedEvents });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Post request for liking an event
router.post('/likeevent', fetchuser, async (req, res) => {
    try {
        const likeexists = await User.find({ _id: req.user.id, likedEvents: { $elemMatch: { $eq: req.body.eventID } } }); // check if this event is already present in liked list of user
        if (likeexists.length > 0) {
            await User.findByIdAndUpdate(req.user.id, { $pull: { likedEvents: req.body.eventID } }); // remove from list of liked events when clicked on like second time
            await Event.findByIdAndUpdate(req.body.eventID, { $inc: { like: -1 } });  // decrement likes
            res.json({ id: "LIKE" });
        }
        else {
            await User.findByIdAndUpdate(req.user.id, { $push: { likedEvents: req.body.eventID } }); // add event in list of liked events
            await Event.findByIdAndUpdate(req.body.eventID, { $inc: { like: 1 } });   // increment likes
            res.json({ id: "DISLIKE" });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


router.post('/checkforlikeevent', fetchuser, async (req, res) => {
    try {
        const likeexists = await User.find({ _id: req.user.id, likedEvents: { $elemMatch: { $eq: req.body.eventID } } }); // check if this event is already present in liked list of user
        if (likeexists.length > 0) {

            res.json({ found: true });
        }
        else {
                   
            res.json({ found: false });
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router