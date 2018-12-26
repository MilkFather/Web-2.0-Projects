const bcrypt = require("bcrypt");
const validUtil = require("./util.js")
const database = require("./db.js")

exports.autoLogin = function (req, res) {
    //console.log("req.query.username = "); console.log(req.query.username)
    //console.log("req.session.username = "); console.log(req.session.username)
    if (req.query.username == undefined) {
        // empty username, check cookie for session
        if (req.session.username) {
            res.redirect(302, "/?username=" + req.session.username); // if with session, try to redirect to user page
        } else {
            res.render("login") // if no session, require login
        }
    } else {
        // check for session, for identity
        if (req.session.username) {
            // has session username
            (database.findUser("name", req.session.username)).then(function(result) {
                if (result.length <= 0) { // session user does not exist
                    req.session.destroy();
                    res.redirect(302, "/"); // send back to log in
                } else {
                    if (result[0].name == req.query.username) {
                        res.render("info", {"name": result[0].name, "id": result[0].id, "email": result[0].email, "phone": result[0].phone}) // show normally
                    } else {
                        res.render("info", {"redirectmsg": "只能够访问自己的数据，3s后消息关闭", "name": result[0].name, "id": result[0].id, "email": result[0].email, "phone": result[0].phone}) // show with a message
                    }
                }
            });
        } else {
            // don't have session username
            res.redirect(302, "/"); // ask for log in
        }
    }
}

exports.signup = function (req, res) {
    res.render('regist');
}

exports.login = function (req, res) {
    // POST to "/", check username and password
    database.findUser("name", req.body.name).then(function (arr){
        if (arr.length <= 0) {
            return bcrypt.compare("", "$2b$10$8VDMEtg03TQi3zIovoihJuAi4pYnfX5DkneHtI78GNspVknNN62K2");    // expected false, as password must be at least 6 length
        } else {
            return bcrypt.compare(req.body.pwd, arr[0].password);
        }
    }).then(function(result) {
        if (result == true) {
            req.session.username = req.body.name;
            res.send("0");
        } else {
            res.send("1");
        }
    });
}

exports.logout = function (req, res) {
    // console.log("quitting");
    req.session.destroy();
    res.send("0");
}

exports.regUser = function (req, res) {
    // POST to "/", check if legal
    if (req.body.request == "check") {
        checkExistUser(req, res);
    } else if (req.body.request == "register") {
        checkAndNew(req, res);
    } else {
        req.send(400);
    }
}

function checkAndNew(req, res) {
    result = 0;
    if (!validUtil.validateName(req.body.name))
        result += (1 << 4);
    if (!validUtil.validatePassword(req.body.pwd))
        result += (1 << 3);
    if (!validUtil.validateID(req.body.id))
        result += (1 << 2);
    if (!validUtil.validateEmail(req.body.email))
        result += (1 << 1);
    if (!validUtil.validatePhone(req.body.phone))
        result += (1 << 0);
    if (result == 0) {
        bcrypt.hash(req.body.pwd, 10).then(function(pd) {
            database.addUser(req.body.name, pd, req.body.id, req.body.email, req.body.phone);
        })
        req.session.username = req.body.name;
    }
    res.send(result.toString())
}

function checkExistUser(req, res) {
    (database.findUser(req.body.field, req.body.name)).then(function(result) {
        if (result.length <= 0)
            res.send("0");
        else 
            res.send("1");
    })
}
