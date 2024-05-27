const express = require('express');
const path = require('path');

const app = express();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(express.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

// Serve static files from the 'multimedia' directory
app.use('/multimedia', express.static(path.join(__dirname, 'multimedia')));

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
