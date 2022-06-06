const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render(__dirname + "/views/prof.ejs") )
    .post((req, res) =>  res.send(`Hello ${req.user.displayName}`));

module.exports = router;
function onSignIn(googleUser){
    let profile=googleUser.getBasicProfile();
    $("#name").text(profile.getName());
    $("#email").text(profile.getEmail());
}
function signOut(){
    let auth2=gapi.auth2.getAuthInstance();
    auth2.signOut().then(function (){
        alert("You have been signed out");
    })
}
const jsdom = require("jsdom");

// Creating a window with a document
const dom = new jsdom.JSDOM(`<!DOCTYPE html>
<body>
<h1 class="heading">
    GeeksforGeeks
</h1>
</body>
`);
const jquery = require("jquery")(dom.window);

// Appending a paragraph tag to the body
jquery("body").append("<p>Is a cool Website</p>");

// Getting the content of the body
const content = dom.window.document.querySelector("body");
