const http = require("http");
const express = require("express");
const cookieParser = require("cookie-parser")
const session = require("express-session")
const router = require('./route.js');

const port = 8000;
const skey = "4xe6YT4DwAAtTrgYU109LIlkbvC0PE";

const app = express();

app.use(express.json());       
app.use(express.urlencoded());
app.use(cookieParser(skey));
app.use(session({
    secret: skey,
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('./res'));

app.set('views', './templates');
app.set('view engine', 'pug');

app.get('/', router.autoLogin)
app.get('/regist', router.signup)
app.post('/', router.login)
app.post('/regist', router.regUser)
app.post('/logout', router.logout)

app.listen(port, () => console.log(`app listening on port ${port}!`))