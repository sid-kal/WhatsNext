const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://cs253proj:cat%40123@cluster0.wadlk0x.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;