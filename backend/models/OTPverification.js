const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPverificationSchema = new Schema({
    userID:String,
    otp: String
});

const OTPverification = mongoose.model(
    'otpverification',OTPverificationSchema
);

module.exports = OTPverification;