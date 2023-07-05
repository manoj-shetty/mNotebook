const mongoose = require('mongoose');


const mongoURI = "mongodb://0.0.0.0:27017"

const connectToMongo = () => {
    mongoose.connect(mongoURI); 
    console.log("Connected to Mongo Successfully");
    
}

module.exports = connectToMongo