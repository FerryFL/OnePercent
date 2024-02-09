require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

const progressRoutes = require('./routes/progress');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');

// Middleware
app.use(express.json());

// Enable CORS for specific routes
const corsConfig = {
    origin: ["http://localhost:3000","https://one-percent-ten.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
};

app.use('', cors(corsConfig));

app.get("/", (req, res) => {
    res.json({ hello: 'world' });
});

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/progress', progressRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port', process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });
