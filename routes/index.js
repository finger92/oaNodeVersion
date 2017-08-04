var express = require('express');
var router = express.Router();
var documentService = require('../service/documentService.js');

/* GET home page. */
router.all('/', function(req, res, next) {
    documentService.getDoc(req.body, (rt)=>{
        res.render('index', rt);
    });
});

module.exports = router;
