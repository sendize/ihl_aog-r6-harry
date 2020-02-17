'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index', { title: 'R6 Harry' });
});

router.get('/api', function(req, res, next) {
    
});

module.exports = router;
