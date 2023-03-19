const mongoose = require('mongoose');
const Event = require('../models/Event');
const fetchevent = (req,res,next) => {
    const eventID = req.body.eventID;
    if(!eventID){
        res.status(401).send({error: eventID});
    }
    try 
    {
        if (!mongoose.isValidObjectId(eventID))
        {
            res.status(401).send({error: "Event ID is invalid"});
        }
        else
        {
            res.event = eventID;
            next();
        }
    }
    catch (error) 
    {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
module.exports = fetchevent;