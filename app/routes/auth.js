var authController = require('../controllers/authcontroller.js');
var db = require("../models");
var path = require("path");

module.exports = function (app, passport) {

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/success',
        failureRedirect: '/failhandler'
    }
    ));
    
    app.get('/success', isLoggedIn, authController.dashboard);
    app.post('/success/post', authController.dashboardPost);
    app.post('/success/comment', authController.dashboardComment);

    app.get("/index", isLoggedInHome, (req, res) => {
        res.render("index");
    });
    app.get('/logout', authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {

        successRedirect: '/success',
        failureRedirect: '/failhandler'

    }
    ));
    app.get('/failhandler', (req, res) => {
        res.render('index', { message: req.flash('error') })
    })
    //create routes to add merged files
    app.get('/stylecss', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/styles/styles.css'));
    });
    app.get('/sunshinejpg/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/styles/images/sunshine.jpg'));
    })
    app.get('/mapjs/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/assets/js/map.js'));
    })
    
    app.use('', function (req, res) {
        // res.sendFile(path.join(__dirname, '../public/assets/img/404.png'));
        res.redirect("index")
    })

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/');
    }

    function isLoggedInHome(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        } else {
            res.redirect("/success");
        }
    }
}