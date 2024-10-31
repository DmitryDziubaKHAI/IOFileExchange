const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const fileController = require('./controllers/FileController');
const userController = require('./controllers/UserController');

const app = express();
const upload = multer();

const sessionKey = 'MySuperKey@todo-config';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post(
    '/upload',
    upload.single('file'),
    /**
     * @param {import('express').Request & {file: UploadFileDescription}} req
     * @param {import('express').Response} res
     */
    (req, res) => {
        return fileController.uploadFile(req, res);
    }
);

app.get(
    '/files',
    (req, res) => {
        return fileController.listFiles(req, res);
    }
);

app.get(
    '/download/:filename',
    (req, res) => {
        return fileController.downloadFile(req, res);
    }
);

app.post(
    '/signup',
    (req, res) => {
        return userController.addUser(req, res);
    }
);
app.post(
    '/login',
    (req, res) => {
        return userController.login(req, res);
    }
);
app.post(
    '/logout',
    (req, res) => {
        return userController.logout(req, res);
    }
);

app.get('/', (req, res) => {
    res.render('layout', {
        content: 'index',
        user: req.session.user
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('layout', {
        content: 'error',
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
