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

//Homepage
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM  items';
    let query = db.query(sql, (err, result) =>{
        if (err) throw err;
        res.render('pages/index', {
            data:result
        });
    }); 
});
//Create 
app.get('/create', (req, res) => {
    res.render('pages/create');
});

app.post('/create', (req, res) => {
    console.log(req.body);
    res.send('creating user');
});


db.connect((err) => {
    if(err) throw err;
    console.log('MySQL succesfully connected!');
});

app.listen(port,()=> {
    console.log(`Started listening on port ${port}`);
});