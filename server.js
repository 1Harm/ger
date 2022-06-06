const  express = require('express')
const app = express()
var createError = require('http-errors');
const UserRoute = require('./routes/UserRoute')
const methodOverride = require('method-override')
app.use('/user',UserRoute)
var path = require('path');
const {router} = require("express/lib/application");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('assets'))
app.use(methodOverride('_method'))
const port = 7777
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs')
app.use("/", require("./re"));
app.use("/login", require("./login"));
app.use("/google", require("./routes/google"));
app.use("/about", require("./abouts"));
app.use("/prof", require("./prof"));
app.use("/au", require("./routes/au"));
app.use("/deleteds", require("./routes/deleteds"));
app.use('/ad', require("./routes/index"));
app.use('/users', require("./routes/users"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://1Harm:EsOd9029@cluster0.7hrdf.mongodb.net/Signin');
let db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
const ejs=require('ejs')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('./config');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
  const collection = req.app.locals[config.dbCollection];
  req.collection = collection;
  next();
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


app.post('/sign_up', function(req,res){
    var email =req.body.email;
    var password = req.body.password;
    var data = {
        "email":email,
        "password":password,

    }
    db.collection('Harm').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");

    });

    return res.redirect('./prof');
})
const session=require("express-session");
app.use(session({secret:'cats'}));
require('./auth');
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
app.get('/l', (req, res) => {
    res.send('<a href="/auth/google">Authentication with google</a>');
});
app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect:'/protected',
        failureRedirect:'/auth/failure',
    }))
app.get('/google/failure', (req,res)=>{
    res.send('Something went wrong')
})

app.get('/auth/google',
    passport.authenticate('google', {scope:['email', 'profile']}))
app.get('/protected', isLoggedIn, (req, res) => {
     res.redirect('./prof');
});
function  isLoggedIn(req,res,next){
    req.user ? next(): res.sendStatus(401);
}
app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});
console.log("server listening at port 7777");

app.get('/update', (req, res) => {
    res.render('update');
});

app.get('/delete', (req, res) => {
    res.render('delete');
});
