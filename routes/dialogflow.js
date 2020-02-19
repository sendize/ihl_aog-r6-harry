'use strict';
var express = require('express');
var router = express.Router();
const dialogflowapi = require('../cores/dialogflow-api/index');


router.get('/', function (req, res, next) {
    res.render('index', { title: 'R6 Harry' });
});

router.get('/api', function(req, res, next) {
    dialogflowapi
});

router.post('/api', dialogflowapi.app);

module.exports = router;
