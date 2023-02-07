const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')

const app = express()

const port = process.env.PORT || 5000

mongoose.connect('mongodb+srv://jonnyo:6LnDvUcM9Ua5H9K4@widespread.yohhvno.mongodb.net/?retryWrites=true&w=majority')
    .then(console.log('Connected to MongoDB'))

const Item = require('./models/Item.js')
const Resource = require('./models/Resource.js')
const Note = require('./models/Note.js')
const Notebook = require('./models/Notebook.js')
const Task = require('./models/Task.js')
const Project = require('./models/Project.js')


// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
const path = require('path')
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


app.get('/company/resources/view/single/:resourceId', async (req, res) => {
    const id = req.params.resourceId
    const resource = await Resource.findById(id)

    res.render('resource-single', {resource})
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

app.get('/company/projects', async (req, res) => {
    const allProjects = await Project.find()

    res.render('projects', {allProjects})

})

app.get('/company/projects/view/single/:projectId', async (req, res) => {
    const id = req.params.projectId
    const project = await Project.findById(id).populate('tasks').exec()
    console.log(project)
    res.render('project-single', { project })
})

app.post('/company/projects/view/single/:projectId/tasks/add', async (req, res) => {
    const projectId = req.params.projectId
    const data = req.body

    const newTask = new Task(data)
    newTask.save()


    console.log(newTask.id)
    const taskId = newTask.id
    await Project.findByIdAndUpdate(projectId, {
        $addToSet: { tasks: newTask.id }
    })
    res.redirect(`/company/projects/view/single/${projectId}`)
})
app.patch('/company/projects/view/single/:projectId/tasks/edit/:taskId', async (req, res) => {
    const taskId = req.params.taskId
    const projectId = req.params.projectId
    const data = req.body
    await Task.findByIdAndUpdate(taskId, data)
    res.redirect(`/company/projects/view/single/${projectId}`)
})
app.get('/company/inventory', async (req, res) => {
    const allItems = await Item.find()

    res.render('inventory', {allItems})

})
app.get('/company/resources', async (req, res) => {
    const allResources = await Resource.find()

    res.render('resources', {allResources})

})
app.get('/company/notes', async (req, res) => {
    const allNotes = await Note.find()

    res.render('notes', {allNotes})

})

app.listen(port, (console.log(`http://localhost:${port}`)))