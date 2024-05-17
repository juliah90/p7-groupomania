const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');


const auth = require('../middleware/auth');

router.get('/', auth, postCtrl.getAllPosts)
router.get('/:id', auth, postCtrl.getOnePost)
router.post('/', auth, multer, postCtrl.createPost)
router.post('/:id/read', auth, postCtrl.readPost)

module.exports = router