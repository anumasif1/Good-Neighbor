var express = require("express");
var app = express();
var passport = require("passport");
var session = require("express-session");
var exphbs = require("express-handlebars");
var moment = require("moment");

var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var flash = require("connect-flash");
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

app.use(session({ secret: "keyboard cat", cookie: { maxAge: 30 * 60 * 1000 }, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './app/views');
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get("/", (req, res) => {
  res.redirect("index");
})

var db = require("./app/models");
var authRoute = require("./app/routes/auth")(app, passport);
require("./app/config/passport/passport")(passport, db.user);

db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});








//EXPBK

// var express = require('express')
// var app = express()
// var passport = require('passport')
// var session = require('express-session')
// var bodyParser = require('body-parser')
// var env = require('dotenv').load()
// var exphbs = require('express-handlebars')
// var PORT = process.env.PORT || 5000;
// var hbs = require('handlebars');
// hbs.registerHelper('if_eq', function (a, b, opts) {
//   if (a == b) {
//     return opts.fn(this);
//   } else {
//     return opts.inverse(this);
//   }
// });
// hbs.registerHelper('formatTime', function (date, format) {
//   var mmnt = moment(date);
//   return mmnt.format(format);
// });
// //For BodyParser
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// // For Passport
// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// //For Handlebars
// app.set('views', './app/views')
// app.engine('hbs', exphbs({ extname: '.hbs' }));
// app.set('view engine', '.hbs');

// app.get('/', function (req, res) {
//   res.redirect("index");
// });
// //Models
// var models = require("./app/models");
// //Routes
// var authRoute = require('./app/routes/auth.js')(app, passport);
// //load passport strategies
// require('./app/config/passport/passport.js')(passport, models.user);
// //Sync Database
// models.sequelize.sync().then(function () {
//   console.log('Nice! Database looks fine')
// }).catch(function (err) {
//   console.log(err, "Something went wrong with the Database Update!")
// });
// app.listen(PORT, function (err) {
//   if (!err)
//     console.log("Site is live"); else console.log(err)
// });




