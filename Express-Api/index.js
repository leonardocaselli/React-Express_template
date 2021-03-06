const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

// Iniciar express
const app = express()
const port = 8000
const mongoUrl = 'mongodb+srv://leocaselli:miperrochocolo@cluster0.bvpuq.mongodb.net/petShelter?retryWrites=true&w=majority'


// Conectar a la base de datos
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

// Refleja el error de conexion base de datos
mongoose.connection.on('error', (err) => {
    console.log('err on db connection', err)
})
// Despega mensaje conexion exitosa
mongoose.connection.on('connected', (err, res) => {
    console.log('mongoose is connected')
})

// Recipe
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS,PUT',
    credentials: true
}

// Middlewares
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes)

app.listen(port, () => console.log(`Listening on port: ${port}`))