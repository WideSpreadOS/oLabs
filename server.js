const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')

const app = express()

const port = 5000

// Middleware
app.use(bodyParser.json());

// Static
app.use(express.static('public'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('landing')

})

app.get('/company/inventory', (req, res) => {
    res.render('inventory')

})

app.listen(port, (console.log(`http://localhost:${port}`)))