var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('home.html', { title: 'Digibook' });
});

/* GET login page. */
router.get('/login', (req, res) => {
  res.render('login.html', { title: 'login' });
});

/* GET signup page. */
router.get('/signup', (req, res) => {
  res.render('signup.html', { title: 'signup' });
});

module.exports = router;
