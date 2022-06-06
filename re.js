const express = require("express");
const app = express()
const router = express.Router();

router

    .route("/")
    .get((req, res) => res.sendfile(__dirname + "/index.html"))
    .post((req, res) => res.send("POST"));
module.exports = router;