require('dotenv').config()

const express = require('express')
const cors = require('cors') // Import cors middleware
const app = express()

const mongoose = require('mongoose')

const progressRoutes = require('./routes/progress')
const reviewRoutes = require('./routes/review')
const userRoutes = require('./routes/user')

// Middleware
app.use(express.json())

// Enable CORS for all routes


const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET","POST","PATCH","DELETE"]
}

app.options("", cors(corsConfig))
app.use(cors(corsConfig))

// app.use(cors({
//     origin: 'https://one-percent-lime.vercel.app'
// }));

app.get("/", (req,res)=>{
    res.json({hello})
})

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/progress', progressRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/user', userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
