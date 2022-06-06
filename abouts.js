const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render(__dirname + "/views/about.ejs"))
    .post((req, res) => res.send("POST"));
module.exports = router;