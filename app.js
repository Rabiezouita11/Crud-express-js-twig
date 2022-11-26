var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');
const http = require('http');
const mongoose = require('mongoose');
const configDB = require('./database/mongodb.json');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Toastify = require('toastify-js');
const ProduitRouter = require("./routes/Produit");
const UserRouter = require("./routes/users");
// console.log(configDB);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
mongoose.connect(configDB.mongo.uri, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("Connected to database");
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/aa',express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 60000 },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}));



app.use('/login', UserRouter);
app.use('/products', ProduitRouter);

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

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Server running on port 3000');
});