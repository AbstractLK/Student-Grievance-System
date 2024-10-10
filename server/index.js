const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/database').connect();
require('./jobs/scheduler');
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT || 3001;

const authRoute = require('./router/auth');
const userRoute = require('./router/users');
const taskRoute = require('./router/tasks');
const complaintRoute = require('./router/complaint');
app.use(express.json());

app.use(cors({
    origin: CLIENT_URL, //frontend URL
    // methods: ['GET', 'POST'], // Specify the HTTP methods you want to allow
    // allowedHeaders: ['Content-Type', 'Authorization'], // Specify the headers you want to allow
}));
app.get('/test', (req, res) => {
  res.send('welcome to the test page!');
});
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/task', taskRoute);
app.use('/complaint', complaintRoute);
app.use('/reset-password', userRoute);
app.all('*', (req, res) => {
    res.send('Page Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});