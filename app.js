const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express()

//connect to mongoDB
const dbURI = "mongodb+srv://DrStrangelove:VMYXIJTyIQr4VXRU@nodejs-miniblog.gamdc.mongodb.net/NodeJS-MiniBlog?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        // listen for requests on port 3000
        app.listen(3000)
        console.log('connected')
    })
    .catch((err) => console.error(err))

// reg view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// blog routs
app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.render('404', {title: '404'})
})