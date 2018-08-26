const express = require('express');
var app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const port_no = '3000';

const regRoutes = require('./routes/RegRoutes');

const keys = require('./config/key');





//middleware for body-parser
app.use(bodyParser.json());//to support json bodies
app.use(bodyParser.urlencoded({extended : false}));//to support URL-encoded bodies
//cors middleware
app.use(cors());







//db
 mongoose.connect(keys.mongoose.mongodbURL);


var db = mongoose.connection;



db.on('error',function (err)
{
  if(err)
  {
    console.log('error on db'+err);
  }

});



db.once('open',function ()
{
  console.log('connected to mlab db');

})




//Middleware for express-session
 app.use(session({
   secret: 'keyboard cat',
   resave: true,
   saveUninitialized: true,
   cookie: { secure: true }
 }));


 /**Middleware for express-messages*/
 app.use(require('connect-flash')());
 app.use(function (req, res, next) {
   res.locals.messages = require('express-messages')(req, res);
   next();
 });



 //middleware for express-expressValidator
 // Express Validator Middleware
 app.use(expressValidator({
   errorFormatter: function(param, msg, value) {
       var namespace = param.split('.')
       , root    = namespace.shift()
       , formParam = root;

     while(namespace.length) {
       formParam += '[' + namespace.shift() + ']';
     }
     return {
       param : formParam,
       msg   : msg,
       value : value
     };
   }
 }));


 // Passport Config
  //require('./config/passport')(passport);
  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
      res.locals.session = req.session;
    next();
 });

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


regRoutes(app);


app.listen(port_no);
console.log('server listen to the port no'+port_no);
