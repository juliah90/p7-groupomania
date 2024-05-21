const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.delete)
router.put('/:id', auth, multer, userCtrl.updateProfile);
router.get('/:id', auth, userCtrl.getProfile);

module.exports = router;