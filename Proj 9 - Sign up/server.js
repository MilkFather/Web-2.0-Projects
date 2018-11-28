var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var fuck = require('./global.js');
var mime = require('mime-types');
var pug = require('pug');

const userpg = pug.compileFile('./web/details.pug');
const regpg = pug.compileFile('./web/register.pug');

http.createServer(function(req, res) {
    if (req.method === 'GET') {
        showPage(req, res);
    } else if (req.method === 'POST') {
        processPost(req, res);
    }
}).listen(8000);

function showPage(req, res) {
    var q = url.parse(req.url, true);
    var query = q.query;
    if (q.pathname == '/') {
        //console.log('query[username] = ', query['username']);
        //console.log(query)
        if (!query['username']) {
            // show register page
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(regpg({'username': "", 'id': "", 'email': "", 'phone': "", 'errormsg': ""}));
            res.end();
        } else if (!fuck.duplicateName(query['username'])) {
            res.writeHead(302, {'Location': '/'});
            res.end();
        } else {
            var u = fuck.getUser(query['username']);
            //console.log(u);
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(userpg({'username': u.name, 'id': u.id, 'email': u.email, 'phone': u.phone}));
            res.end();
        }
        res.writeHead(302, {'Location': '/login.html'});
        res.end();
    } else {
        fs.readFile('./web' + q.pathname, function(err, data) {
            if (err) {
                console.log(err);
                res.writeHead(404, {});
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': mime.lookup('./web' + q.pathname)});
                res.write(data);
                res.end();
            }
        });
    }
}

function processPost(req, res) {
    var postdata = '';
    // receiving data
    req.on('data', function(chunk) {
        postdata += chunk;                                                                 
        // Avoid too much POST data                                                        
        if (postdata.length > 1e6)
            req.connection.destroy();
    });

    // received all data
    req.on('end', function() {
        var post = querystring.parse(postdata);
        var namev = true, idv = true, emailv = true, phonev = true;
        var named = false, idd = false, emaild = false, phoned = false;
        if (!fuck.validateName(post.name)) namev = false;
        if (!fuck.validateId(post.id)) idv = false;
        if (!fuck.validateEmail(post.email)) emailv = false;
        if (!fuck.validatePhone(post.phone)) phonev = false;
        if (fuck.duplicateName(post.name)) named = true;
        if (fuck.duplicateId(post.id)) idd = true;
        if (fuck.duplicateEmail(post.email)) emaild = true;
        if (fuck.duplicatePhone(post.phone)) phoned = true;

        if (namev && idv && emailv && phonev && !named && !idd && !emaild && !phoned) {
            fuck.regUser(post.name, post.id, post.email, post.phone);
            res.writeHead(302, {'Location': '/?username=' + post.name});
            res.end();
        } else {
            var s = "Error.";
            if (!namev) s += " Invalid name.";
            if (!idv) s += " Invalid ID.";
            if (!emailv) s += " Invalid email.";
            if (!phonev) s += " Invalid phone.";
            if (named) s += " Duplicate name.";
            if (idd) s += " Duplicate ID.";
            if (emaild) s += " Duplicate email.";
            if (phoned) s += " Duplicate phone.";
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(regpg({'username':post.name, 'id':post.id, 'email':post.email, 'phone':post.phone, 'errormsg':s}));
            res.end();
        }
    });
}
