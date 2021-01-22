const express = require('express');
const router = express.Router();//remplace app.post dans les routes par router.post
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
module.exports = router;