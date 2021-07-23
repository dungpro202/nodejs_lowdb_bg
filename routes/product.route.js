const express = require('express');

const controller = require('../controllers/product.controller');

const router = express.Router();

router.get('/', controller.index);

// router.get('/cookies', (req, res, next) => {
//     res.cookie('product-id',12345678);
//     res.send('Hello')
// })

//route parameters


module.exports = router;