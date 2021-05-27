const localStrategy = require('passport-local').Strategy;
const { pool } = require('./elephantsql');
const bcrypt = require('bcrypt');

function initialize(passport){
    const authenticateUser = (email, password, done) => {
        pool.query(
            'SELECT * FROM cuenta WHERE correo = $1', [email], (err, results) => {
                if(err){
                    return console.error('Error executing query', err.stack);
                }

                console.log(results.rows);

                if(results.rows.length > 0){
                    const user = results.rows[0];
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err){
                            return console.error('Error executing query', err.stack);
                        }

                        if(isMatch){
                            return done(null, user);
                        }else{
                            return done(null, false, {message: "La contraseña es incorrecta."});
                        }
                    });
                }else{
                    return done(null, false, {message: "El correo no se encuentra registrado."});
                }
            }
        );
    };

    passport.use(
        new localStrategy(
            {
                usernameField: 'username',
                passwordField: 'password',
            }, 
        authenticateUser
        )
    );

    passport.serializeUser((user, done) => done(null, user.id_cuenta));

    passport.deserializeUser((id_cuenta, done) => {
        pool.query(
            'SELECT * FROM cuenta WHERE id_cuenta = $1', [id_cuenta], (err, results) => {
                if (err){
                    return console.error('Error executing query', err.stack);
                }

                return done(null, results.rows[0]);
            }
        );
    });
}

module.exports = initialize;