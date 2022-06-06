const mongoose = require("mongoose");
let db = mongoose.connection;

module.exports = async function deleteUser(req, res){
    var email = req.body.email;
    var data = {
        "email": email
    }
    await db.collection('Harm').deleteOne(data, function (err, collection) {
        if (err) throw err;
        res.send({message:"Record deleted Successfully"});

    });
    return res.redirect('./deleteds');
}