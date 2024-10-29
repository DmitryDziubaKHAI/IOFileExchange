const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const fileController = require('./controllers/FileController');
const userController = require('./controllers/UserController');

const app = express();
const upload = multer();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
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
    '/user',
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
    res.render('index');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
