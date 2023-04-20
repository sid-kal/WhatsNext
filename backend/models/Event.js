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
    startTime:{
        type: Date,
        default: Date.now
    },
    endTime:{
        type:Date,
        default:Date.now
    },
    reqsp:{
        type:Boolean,
        default:false
    },
    like:{
        type: Number,
        default: 0,
    },
    isspecial:{
        type: Boolean,
        default: false
    },
    organiser:{
        type:String,
        default:"Unknown user"
    },
    image:{
        type: String,
        default: ""
    },
    venue:{
        type:String,
        default: "-"
    }
  });

  module.exports = mongoose.model('events', EventSchema);