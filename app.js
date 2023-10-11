var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var homeRouter = require('./routes/home.route');
var settingRouter = require('./routes/settings.route');
var apiSalonRouter = require('./routes/salon.apiRoute');
var apiTimeRouter = require('./routes/time.apiRoute');
var apiUsersRouter = require('./routes/users.apiRoute');
var apiProductRouter = require('./routes/ProductSalon.apiRoute');
var apiService = require('./routes/Service.route');
var apiComment = require('./routes/comment.apiRoute');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/settings', settingRouter);
app.use('/apisalon', apiSalonRouter);
app.use('/apitime', apiTimeRouter);
app.use('/apiuser', apiUsersRouter);
app.use('/apiProduct', apiProductRouter);
app.use('/service', apiService);
app.use('/apiComment', apiComment);

const Bill = require('./models/BillModel')

app.post('/addBill', async (req, res) => {

  var u = new Bill(req.body);

  try {
    await u.save();

    res.status(200).json(u);

  } catch (error) {
    res.status(500).send(error);
  }
})


app.get('/getBill/:idUser', (req, res) => {

  const id = req.params.idUser;

  Bill.find({ idUser: id }).then(data => {
    res.status(200).json(data);
  })


})


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
