const passport = require('passport');
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://1Harm:EsOd9029@cluster0.7hrdf.mongodb.net/Signin');
let db = mongoose.connection;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_CLIENT_ID='888553348835-ocu75np9rb3f39u6ru9qq0auc04lemec.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET='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';
passport.use(new GoogleStrategy({
        clientID:     GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:7777/google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        db.collection('Harm').insertOne({ googleId: profile.id }, function (err, user) {
            return done(null, profile);
        });
    }
));
passport.serializeUser(function (user,done){
    done(null,user);
});
passport.deserializeUser(function (user,done){
    done(null,user);
});