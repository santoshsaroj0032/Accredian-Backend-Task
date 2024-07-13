const express= require('express')
const bodyParser = require('body-parser');
const cors=require('cors')
const refRoutes=require('./routes/referalRoutes')
const mysql = require('mysql');
const app=express()
app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/ref', refRoutes);

   
    app.listen(7000, () => {
        console.log(`Server running on port 7000`);
    });

