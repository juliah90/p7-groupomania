const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');


const auth = require('../middleware/auth');

router.get('/', auth, postCtrl.getAllPosts)
router.get('/:id', auth, postCtrl.getOnePost)
router.post('/', auth, multer, postCtrl.createPost)
router.post('/:id/read', auth, postCtrl.readPost)

// Messages array to store messages in-memory
let messages = [];
//TODO move handler code into controller
// Get all messages
router.get('/messages', auth, (req, res) => {
  res.json(messages);
});
//TODO move handler code into controller
// Create a new message
router.post('/messages', auth, (req, res) => {
  const message = req.body;
  messages.push(message);
  res.status(201).json(message);
});

module.exports = router