const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;


const connectToMongo = ()=>{
    mongoose.connect(uri, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;