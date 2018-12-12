var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('mime-types');

http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var query = q.query;
    if (req.method === 'GET') {
        if (q.pathname == '/num') {
            processPost(req, res, query["rdfail"] != undefined);
        } else {
            showPage(req, res);
        }
    } else if (req.method === 'POST') {
        processPost(req, res, query["rdfail"] != undefined);
    }
}).listen(8000);

function showPage(req, res) {
    var q = url.parse(req.url, true);
    var query = q.query;
    if (q.pathname == '/') {
        res.writeHead(302, {'Location': '/index.html'});
        res.end();
    } else {
        if (q.pathname.startsWith('/shared/')) {
            fs.readFile('.' + q.pathname, function(err, data) {
                if (err) {
                    console.log(err);
                    res.writeHead(404, {});
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': mime.lookup('.' + q.pathname)});
                    res.write(data);
                    res.end();
                }
            });
        } else {
            fs.readFile('.' + q.pathname, function(err, data) {
                if (err) {
                    console.log(err);
                    res.writeHead(404, {});
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': mime.lookup(q.pathname)});
                    res.write(data);
                    res.end();
                }
            });
        }
    }
}

function processPost(req, res, randomfail = false) {
    var timer = setTimeout(function() {
        // if not S5, comment this line:
        if (Math.random() > 0.75 && randomfail) { res.writeHead(500, {}); res.end(); return; }

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write((1 + Math.round(Math.random() * 9)).toString());
        res.end();
    }, (1 + Math.round(Math.random() * 2)) * 1000);
}
