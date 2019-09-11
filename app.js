const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.listen(port,()=> {
    console.log(`Started listening on port ${port}`);
});