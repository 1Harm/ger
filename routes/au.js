const express = require("express");
const app = express()
const router = express.Router();

router

    .route("/")
    .get((req, res) => res.render(__dirname + "/views/au.ejs") )
    .post((req, res) => res.send("POST"));
module.exports = router;
