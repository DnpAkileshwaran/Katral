const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./db");
const collection = "email";
const app = express();


// get request

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'mock.html'));
});

// read
app.get('/getEmails',(req,res)=>{
    // get all Todo documents within our todo collection
    // send back to user as json
    // send this value from user question number
    db.getDB().collection(collection).find({quesNo:"2"},{projection: {_id:0,quesNo:0}}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
            return res.status(302).send('Welcome to main page');        
        }
    });
});

app.get('/getEmailsByMail',(req,res)=>{
    // get all Todo documents within our todo collection
    // send back to user as json
    // send this value from user question number
    db.getDB().collection(collection).find({email:"akshitha@gmail.com"},{projection: {_id:0,email:0}}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            console.log(documents);
            res.json(documents);
        }
    });
});

db.connect((err)=>{
    // If err unable to connect to database
    // End application
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    // Successfully connected to database
    // Start up our Express Application
    // And listen for Request
    else{
        app.listen(3000,()=>{
            console.log('connected to database, app listening on port 3000');
        });
    }
});

