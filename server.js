const express = require('express')
const path = require('path')
const api = require('./server/routes/api')
const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/WeatherApp', {useNewUrlParser: true})


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = 3000

app.use('/', api)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
