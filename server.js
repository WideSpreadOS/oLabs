const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')

const app = express()

const port = process.env.PORT || 5000

mongoose.connect('mongodb+srv://jonnyo:6LnDvUcM9Ua5H9K4@widespread.yohhvno.mongodb.net/?retryWrites=true&w=majority')
    .then(console.log('Connected to MongoDB'))

const Item = require('./models/Item.js')
const Resource = require('./models/Resource.js')
const Note = require('./models/Note.js')
const Project = require('./models/Project.js')


// Middleware
app.use(bodyParser.json());

// Static
app.use(express.static('public'));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const allResources = await Resource.find()
    const allNotes = await Note.find()
    const allItems = await Item.find()
    const allProjects = await Project.find()
    res.render('landing', {allResources, allNotes, allItems, allProjects})

})

app.post('/item/add', async (req, res) => {
    const data = req.body
    console.log(data)
    const newItem = new Item(data)
    newItem.save()
    res.redirect('/')
})

app.post('/resource/add', async (req, res) => {
    const data = req.body
    console.log(data)
    const newResource = new Resource(data)
    newResource.save()
    res.redirect('/')
})

app.post('/note/add', async (req, res) => {
    const data = req.body
    console.log(data)
    const newNote = new Note(data)
    newNote.save()
    res.redirect('/')
})

app.post('/project/add', async (req, res) => {
    const data = req.body
    console.log(data)
    const newProject = new Project(data)
    newProject.save()
    res.redirect('/')
})

app.get('/company/inventory', (req, res) => {
    res.render('inventory')

})

app.listen(port, (console.log(`http://localhost:${port}`)))