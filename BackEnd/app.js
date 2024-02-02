const express = require('express');
const app = express();

const urlPrefix = '/api';

const mongoose = require('mongoose');

const fs = require('fs'); 

const cert = fs.readFileSync('keys/certificate.pem');

const options = { server: { sslCA: cert }};

const connstring = "mongodb+srv://ke:o1nc3ezTcKmmOdMD@jamiecluster.c0z0u5b.mongodb.net/?retryWrites=true&w=majority";

const fruitRoutes = require("./routes/fruit");
const userRoutes = require("./routes/user");

mongoose.connect(connstring) 
    .then(() => {
        console.log('Connected :-)');
    })
    .catch((error) => {
        console.log('Not connected :-(',error);
    },options);

app.use(express.json());

app.use((reg,res,next)=>
{
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
 res.setHeader('Access-Control-Allow-Methods', '*');
 next();
});


app.use(urlPrefix+'/fruits',fruitRoutes)
app.use(urlPrefix+'/users',userRoutes)

module.exports = app;

