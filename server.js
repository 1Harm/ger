const  express = require('express')
const app = express()
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
app.use("/go", require("./go"));
app.use("/login", require("./login"));
app.use("/google", require("./routes/google"));
app.use("/about", require("./abouts"));
app.use("/prof", require("./prof"));
app.use("/au", require("./routes/au"));
app.use("/deleteds", require("./routes/deleteds"));
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);
const { MongoClient } = require('mongodb');
const{ ObjectId } = require('mongodb').ObjectId;
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://1Harm:EsOd9029@cluster0.7hrdf.mongodb.net/Signin');
let db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
const ejs=require('ejs')
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
app.get('/doctor',((req, res) => {
  res.sendFile(__dirname+'/doctor.html')
}))
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
app.post('/los', function(req,res){
  var email =req.body.email;
  var password = req.body.password;
  var data = {
    "email":email,
    "password":password
  }
  db.collection('Doctors').insertOne(data,function(err, collection){
    if (err) throw err;
    console.log("Record inserted Successfully");

  });

  return  res.sendFile(__dirname+'/queue.html');
})
async function main() {
  const uri = "mongodb+srv://user:aisha@cluster0.ppulr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  try {

    await client.connect();

    await init(client);

  } catch (e) {
    console.error(e);
  }
}
main().catch(console.err);


async function init(client) {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); //extended:true to encode objects and arrays  https://github.com/expressjs/body-parser#bodyparserurlencodedoptions

  const db = client.db('eventList')
  const events = db.collection('events')

  app.get('/init', function (req, res) {
    events.insertOne({
      text: "Some Helpful event",
      start_date: new Date(2018, 8, 1),
      end_date: new Date(2018, 8, 5)
    })
    events.insertOne({
      text: "Another Cool Event",
      start_date: new Date(2018, 8, 11),
      end_date: new Date(2018, 8, 11)
    })
    events.insertOne({
      text: "Super Activity",
      start_date: new Date(2018, 8, 9),
      end_date: new Date(2018, 8, 10)
    })
    events.save();
    res.send("Test events were added to the database")
  });

  app.get('/data', function (req, res) {
    events.find().toArray(function (err, data) {
      //set the id property for all client records to the database records, which are stored in ._id field
      for (var i = 0; i < data.length; i++){
        data[i].id = data[i]._id;
        delete data[i]["!nativeeditor_status"];
      }
      //output response
      res.send(data);
    });
  });


  // Routes HTTP POST requests to the specified path with the specified callback functions. For more information, see the routing guide.
  // http://expressjs.com/en/guide/routing.html

  app.post('/data', function (req, res) {
    var data = req.body;
    var mode = data["!nativeeditor_status"];
    var sid = data.id;
    var tid = sid;

    function update_response(err) {
      if (err)
        mode = "error";
      else if (mode === "inserted"){
        tid = data._id;
      }
      res.setHeader("Content-Type", "application/json");
      res.send({ action: mode, sid: sid, tid: String(tid) });
    }

    if (mode === "updated") {
      events.updateOne({"_id": ObjectId(tid)}, {$set: data}, update_response);
    } else if (mode === "inserted") {
      events.insertOne(data, update_response);
    } else if (mode === "deleted") {
      events.deleteOne({"_id": ObjectId(tid)}, update_response)
    } else
      res.send("Not supported operation");
  });
};
