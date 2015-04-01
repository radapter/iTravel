var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'iTravel: Personal and Adaptive Tour Guide' });
});

module.exports = router;
