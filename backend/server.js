const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Bring Routes
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');

// App
const app = express();

// DB
mongoose
    .connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('DB connected'));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({origin: `${process.env.CLIENT_URL}`}));
}

// Routes Middleware
app.use('/api', blogRoutes);
app.use('/api', authRoutes);

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});