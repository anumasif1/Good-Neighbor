var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            }
            else {
                done(user.errors, null);
            }
        }); 

    });
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, name, password, done) {

            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({ where: { name: name } }).then(function (user) {

                if (user) {
                    
                    return done(null, false, req.flash('error','Email has been taken! Please try a different one!'));
                }
                else {
                    var userPassword = generateHash(password);
                    var data =
                    {
                        name: name,
                        password: userPassword
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {

                            return done(null, false);
                        }
                        if (newUser) {
                            
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));
    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: true 
        },
        function (req, name, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({ where: { name: name } }).then(function (user) {
                if (!user) {
                    return done(null, false, req.flash('error','Email does not exist! Please try again!'));
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, req.flash('error','Wrong password! Please try again!'));
                }
                var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, req.flash('error','Something went wrong with your Signin' ));
            });
        }
    ));

}