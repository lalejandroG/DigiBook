const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./passportConfig');
initializePassport(passport);

const { pool } = require('./elephantsql');

router.use(express.urlencoded({ extended: false }));

router.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));


router.use(passport.initialize());
router.use(passport.session());

router.use(flash());

/* GET general home page. */
router.get('/', (req, res) => {
  res.render('home.html', { title: 'Digibook' });
});

/* GET user home page. */
router.get('/home', (req, res) => {
  res.render('homeUser.html', { title: 'Digibook' });
});

/* GET login page. */
router.get('/login', (req, res) => {
  res.render('login.html', { title: 'login' });
});

/* GET signup page. */
router.get('/signup', (req, res) => {
  res.render('signup.html');
});

router.post('/signup', async (req, res) => {
  let { email, username, password, fotoPerfil, biografia } = req.body;
  console.log({
    email,
    username,
    password,
    fotoPerfil,
    biografia
  });
  let errors = [];

  if (errors.lenght > 0){
    res.render('signup.html', { errors });
  }else{
    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    pool.query(
      'SELECT * FROM cuenta WHERE correo = $1', [email], (err, results) => {
        if (err){
          return console.error('Error executing query', err.stack);
        }

        console.log(results.rows);

        if (results.rows.length > 0){
          errors.push({ message: "Ese correo ya ha sido registrado." });
          res.render('signup.html', { errors });
        }else{
          pool.query(
            'INSERT INTO cuenta (correo, username, password, imagen_perfil, biografia) VALUES ($1, $2, $3, $4, $5) RETURNING id_cuenta, password', [email, username, hashedPassword, fotoPerfil, biografia], (err, results) => {
                if (err){
                  return console.error('Error executing query', err.stack);
                }
                console.log(results.rows);
                req.flash('exito', "Ha sido registrado.");
                res.redirect('/login');
            }
          );
        }
      }
    );
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));


module.exports = router;
