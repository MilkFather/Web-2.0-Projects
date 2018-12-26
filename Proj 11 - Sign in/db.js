const mongo = require("mongodb").MongoClient;
const bcrypt = require("bcrypt");
const url = "mongodb://localhost:27017/";

mongo.connect(url, function(err, db) {
    if (err) {
        throw err;
    }
    var dbo = db.db("signindb");
    maindb = db;
})

exports.findUser = function (_field, name) {
    // input: a name and the field of the name
    // output: a promise, whose return value should be a list
    // note that this function is ASYNC, whose return value is a promise
    var dbo = maindb.db("signindb");
    if (_field == "name")
        return dbo.collection("users").find({"name": name}).toArray();
    else if (_field == "id")
        return dbo.collection("users").find({"id": name}).toArray();
    else if (_field == "email")
        return dbo.collection("users").find({"email": name}).toArray();
    else if (_field == "phone")
        return dbo.collection("users").find({"phone": name}).toArray();
}

exports.addUser = function (name, password, id, email, phone) {
    // input: basic user information
    // output: no output, reg this user to database
    var dbo = maindb.db("signindb");
    dbo.collection("users").insertOne({"name": name, "password": password, "id": id, "email": email, "phone": phone}, function(err, res) {
        if (err) throw err;
    });
}