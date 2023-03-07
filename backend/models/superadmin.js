const mongoose = require('mongoose');
const { array } = require('prop-types');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    requests : {
        type : array,
        of : events
    },
    
  });
  const superadmin = mongoose.model('superadmin', UserSchema);
  module.exports = superadmin;