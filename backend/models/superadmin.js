const mongoose = require('mongoose');
const { array } = require('prop-types');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    }
  });
  const superadmin = mongoose.model('superadmin', UserSchema);
  module.exports = superadmin;