const express = require('express');
const router = express.Router();
const apiAuthController = require('../../controllers/api/authController');

router.post('/login', apiAuthController.login);

router.post('/register', apiAuthController.register); 

module.exports = router;
