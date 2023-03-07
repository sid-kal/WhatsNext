const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
    like:{
        type: Number,
        default: 0,
    },
  });

  module.exports = mongoose.model('events', EventSchema);