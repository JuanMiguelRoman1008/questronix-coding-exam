const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();
const port = 3000;

//credentials of the database
let secret = require('./credentials.json');

const db = mysql.createConnection({
    host:'localhost',
    user: secret.user,
    password: secret.password,
    database:'inventory'
});

db.connect((err) => {
    if(err) throw err;
    console.log('MySQL succesfully connected!');
});

app.listen(port,()=> {
    console.log(`Started listening on port ${port}`);
});