const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

//credentials of the database
let secret = require('./credentials.json');

const db = mysql.createConnection({
    host:'localhost',
    user: secret.user,
    password: secret.password,
    database:'inventory'
});

//Routes
app.get('/', (req, res) => {
    res.render('pages/index');
});



db.connect((err) => {
    if(err) throw err;
    console.log('MySQL succesfully connected!');
});

app.listen(port,()=> {
    console.log(`Started listening on port ${port}`);
});