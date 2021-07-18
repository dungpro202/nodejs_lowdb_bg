const express = require('express');

const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/', controller.index);


router.get('/search', controller.search);

router.get('/create', controller.create);

//route parameters
router.get('/:userId', controller.get);

router.post('/create', controller.portCreate);

module.exports = router;