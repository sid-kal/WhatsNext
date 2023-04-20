const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
// const Otpverification = require("../models/OTPverification");

const JWT_SECRET = 'JustRandomString';

const nodemailer = require("nodemailer");

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/generateotp', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  // body('otp', 'Enter the otp sent on your email')
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  //let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  already_exists = false
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      //console.log("User already exists")
      //return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
      already_exists = true

    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    if(!already_exists){
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'talingupta0@gmail.com',
        pass: 'vlswzmjbmrsqksew'
      }
    })
    transporter.sendMail({
      from: 'talingupta0@gmail.com',
      to: req.body.email,
      subject: 'OTP Verification',
      text: `Your OTP for account verification is ${otp}.`,
      html: `<p>Your OTP for account verification is <strong>${otp}</strong>.</p>`,
      function(error, info){
        if (error) {
           console.log(error);
        }  else {
           console.log('Email sent: ' + info.response);
        }
       }
    });
  }
  
    success = true;
    res.json({otp,success,already_exists})


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  // body('otp', 'Enter the otp sent on your email')
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  try {
   
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    var user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      wantnotification: req.body.notify
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);


    // res.json(user)
    success = true;
    res.json({ success, authtoken })


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})



// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.post('/getuserbyemail', [body('email', 'Enter a valid email').isEmail()],  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  try {
    const user = await User.find({email:req.body.email});
    let success = false;
    if (user.length !== 0) {
      success = true;
    }
    return res.json({ success: success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

router.post('/generateotpforrecovery', [
  body('email', 'Enter a valid email').isEmail(),
  // body('otp', 'Enter the otp sent on your email')
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  //let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }
  try {
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'talingupta0@gmail.com',
        pass: 'vlswzmjbmrsqksew'
      }
    })
    transporter.sendMail({
      from: 'talingupta0@gmail.com',
      to: req.body.email,
      subject: 'OTP Verification',
      text: `Your OTP for changing password is ${otp}.`,
      html: `<p>Your OTP for changing password is <strong>${otp}</strong>.</p>`,
      function(error, info){
        if (error) {
           console.log(error);
        }  else {
           console.log('Email sent: ' + info.response);
        }
       }
    });
  
  
    success = true;
    res.json({otp,success})


  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// router.post('/changepass', [
//   body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
//   // body('otp', 'Enter the otp sent on your email')
// ], async (req, res) => {
//   // If there are errors, return Bad request and the errors
//   let success = false;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array()});
//   }
//   try {
//    const userf = await User.find({email:req.body.email});

//     const salt = await bcrypt.genSalt(10);
//     const secPass = await bcrypt.hash(req.body.password, salt);

//     var user = await User.create({
//       name: req.body.name,
//       password: secPass,
//       email: req.body.email,
//       wantnotification: req.body.notify
//     });
//     const data = {
//       user: {
//         id: user.id
//       }
//     }
//     const authtoken = jwt.sign(data, JWT_SECRET);


//     // res.json(user)
//     success = true;
//     res.json({ success, authtoken })


//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// })

router.post('/changepass', [
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  body('email', 'Invalid email').isEmail(),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  }

  try {
    const { email, password } = req.body;

    // Check if the user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }

    

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ success: true, authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router