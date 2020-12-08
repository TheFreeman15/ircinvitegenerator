const express = require('express');
const app = express();
const mongoose = require('mongoose')
const logger = require('morgan')
const MainRoutes = require('./routes/routes')
const bodyParser = require('body-parser')
require('./config/db')();
// Middlewares 
app.set('view engine', 'ejs');
app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Routes
app.use(express.static(__dirname + '/public')); 
app.use(MainRoutes)
// Errors 

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    res.render('pages/404');
})

app.use((err,req,res,next)=>{
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500
    // Respond to client 
    res.render('pages/500')
    // Notify console
    console.log(err);
})



app.listen(80,()=>console.log("Listening on port 80"))

