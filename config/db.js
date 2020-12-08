const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.DB_URI

module.exports = () =>{
    mongoose.connect(dbURI,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("Error connecting to DB"));
}