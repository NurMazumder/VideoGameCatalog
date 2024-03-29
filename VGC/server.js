const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// connect to database
connectDB();

//middleware
app.use(express.json({ extended: false }));


app.get('/', (req, res) => {
    res.send('API working')
});

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/videogames', require('./routes/api/videogames'));


const PORT = process.env.PORT || 5030;

app.listen(PORT, () => {
    console.log(`port ${PORT}`)
});