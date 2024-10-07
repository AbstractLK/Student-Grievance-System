const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database').connect();
require('./jobs/scheduler');

const authRoute = require('./router/auth');
const userRoute = require('./router/users');
const taskRoute = require('./router/tasks');
const complaintRoute = require('./router/complaint');
const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.APP_PORT || 3001; // Default to 3001 if PORT is not set

const app = express();
//app.use(cors());
app.use(express.json());

// Serve static files from the public directory
// app.use(express.static('public'));

app.use(cors({
    origin: CLIENT_URL, //frontend URL
    // methods: ['GET', 'POST'], // Specify the HTTP methods you want to allow
    // allowedHeaders: ['Content-Type', 'Authorization'], // Specify the headers you want to allow
}));

//router
app.use('/test', (req, res) => {
    res.send('Welcome to the server');
});
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/task', taskRoute);
app.use('/complaint', complaintRoute);
app.use('/reset-password', userRoute);
// app.all('*', (req, res) => {
//     res.send('Page Not Found');
// });

app.listen(PORT, () => {
    console.log(`${process.env.APP_NAME} started at port ${PORT}`);
});