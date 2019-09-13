var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var exphbs = require("express-handlebars");
var db = require("./app/models");
var bodyParser = require('body-parser');
var moment = require("moment");
var path = require("path");

require("./app/config/passport/passport")(passport, db.user);

var PORT = process.env.PORT || 3000;

var flash=require("connect-flash");
app.use(flash());

var hbs = require('handlebars');
hbs.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});
hbs.registerHelper('formatTime', function (date, format) {
    var mmnt = moment(date);
    return mmnt.format(format);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: "keyboard cat",cookie: { maxAge: 30*60*1000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './app/views');
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');



app.get("/", (req, res) => {
    res.redirect("index");
})



var authRoute = require("./app/routes/auth")(app, passport);

db.sequelize.sync({force: false}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});