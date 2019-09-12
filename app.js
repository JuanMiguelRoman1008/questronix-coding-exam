const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({ extended: false }))

//Routes
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM  items';
    let query = db.query(sql, (err, result) =>{
        if (err) throw err;
        res.render('pages/index', {
            data:result
        });
    }); 
});

app.get('/create', (req, res) => {
    res.render('pages/create');
});

app.post('/create', (req, res) => {
    let sql = 'INSERT INTO items SET ?';
    let query = db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.post('/delete', (req, res) => {
    let sql = 'DELETE FROM items WHERE id = ?';
    let query = db.query(sql, req.body.id, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.post('/update', (req, res) => {
    let sql = 'SELECT * FROM items WHERE id = ?';
    let query = db.query(sql, req.body.id, (err, result) => {
        if (err) throw err;
        res.render('pages/update', {
            data:result
        });
    });
});

app.post('/updateinfo', (req, res) => {
    let sql = 'UPDATE items SET ? WHERE id = ?'
    let query = db.query(sql, [req.body,req.body.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
    
});

db.connect((err) => {
    if(err) throw err;
    console.log('MySQL succesfully connected!');
});

app.listen(port,()=> {
    console.log(`Started listening on port ${port}`);
});