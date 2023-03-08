const express = require('express');
const mongoose = require('mongoose');

// Define the event schema
const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  isSpecial: { type: Boolean, default: false },
  isPendingApproval: { type: Boolean, default: false },
});

// Create the event model
const Event = mongoose.model('Event', eventSchema);

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true });

// Create the Express.js application
const app = express();

// Define a route for requesting a special event
app.post('/events', async (req, res) => {
  try {
    // Parse the event details from the request body
    const event = new Event({
      name: req.body.name,
      description: req.body.description,
      date: new Date(req.body.date),
      isSpecial: false,
      isPendingApproval: true,
    });

    // Save the event to the database
    await event.save();

    // Return a response indicating that the request was received
    res.status(200).send('Special event request received');
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Define a route for approving a special event request
app.put('/events/:id', async (req, res) => {
  try {
    // Find the event by ID
    const event = await Event.findById(req.params.id);

    // Update the event to indicate that it is a special event
    event.isSpecial = true;
    event.isPendingApproval = false;
    await event.save();

    // Return a response indicating that the event was approved
    res.status(200).send('Special event approved');
  } catch (err) {
    // Handle any errors that occur
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// Start the Express.js application
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
