var createError = require('http-errors');
var express = require('express');
const dotenv = require("dotenv");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const session = require('express-session');

const db = require('./db/db')
const User = require('./models/userModel')

var webRouter = require('./routes/web');

var app = express();
dotenv.config();

//body parser call
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Session call
app.use(session({secret:"session store",resave: false,saveUninitialized: false,}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', webRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

db();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    // console.log(`Server Running on http://127.0.0.1:${PORT}`)
    console.log(`Server running on http://localhost:${PORT}`)
});

module.exports = app;
