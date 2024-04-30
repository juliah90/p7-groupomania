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

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//    console.error(err.stack);
//    res.status(500).json({ error: 'Internal Server Error' });
// });


module.exports = app;