const nodemailer = require('nodemailer');
const otp = require('./otp.js');

// Create a transporter object

module.exports.send_mail = (email_address) => {
    var OTP = otp.generateOTP();
    let transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,
     auth: {
     user: 'your-email@gmail.com',
     pass: 'your-email-password'
     }
    });

// Create an email message
    let mailOptions = {
     from: 'talingupta05@gmail.com',
     to: email_address,
     subject: 'OTP for Whats Next ',
     text: 'Your otp is : ' + OTP
    };

// Send the email
    transporter.sendMail(mailOptions, function(error, info){
     if (error) {
        console.log(error);
     }  else {
        console.log('Email sent: ' + info.response);
     }
    });
}