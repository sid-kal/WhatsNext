const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Event = require('../models/Event');
const superadmin = require('../models/superadmin');

router.get('/seerequests', async (req, res) => {
    try {
        const events = await Event.find({reqsp:true});

        res.json(events)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
 }
})

router.post('/response', async (req, res) => {
    const userResponse = req.body.response;
  
    try {
      if (userResponse === 'yes') {
       
        await Event.performUpdate();
        await superadmin.performDelete();
        res.send('Request approved');
      } else {
        await superadmin.performDelete();
        res.send('Request declined');
      }
    } catch (err) {
    
      console.error(err);
      res.status(500).send('Error performing database operations');
    }
  }); 
module.exports = router;