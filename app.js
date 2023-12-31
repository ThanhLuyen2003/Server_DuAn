var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser')
var homepageRouter = require('./routes/homepage.route');
var homeRouter = require('./routes/home.route');
var homepageRouter = require('./routes/homepage.route');
var statisticRouter = require('./routes/statistic.route');
var salonRouter = require('./routes/salon.route');
var oderRouter = require('./routes/oder.route');
var productRouter = require('./routes/products.route');
var staffRouter = require('./routes/staff.route');
var serviceRouter = require('./routes/dichvu.route');
var settingRouter = require('./routes/settings.route');
var userRouter = require('./routes/user.route');
var importRouter = require('./routes/import.route');
var apiSalonRouter = require('./routes/salon.apiRoute');
var apiTimeRouter = require('./routes/time.apiRoute');
var apiUsersRouter = require('./routes/users.apiRoute');
var apiProductRouter = require('./routes/ProductSalon.apiRoute');
var apiService = require('./routes/Service.route');
var apiComment = require('./routes/comment.apiRoute');
var api = require('./api/API');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'NDASHUDHAUHD3427328guisfjsdfkjshdjhsafkjsdfkeasdasdasdfsdwe',
  resave: true,
  saveUninitialized: true
}));


app.use('/', homepageRouter);
app.use('/home', homeRouter);
app.use('/dichvu', serviceRouter);
app.use('/salon', salonRouter);
app.use('/oder', oderRouter);
app.use('/product', productRouter);
app.use('/settings', settingRouter);
app.use('/user', userRouter);
app.use('/staff', staffRouter);
app.use('/import', importRouter);
app.use('/statistic', statisticRouter)
app.use('/apisalon', apiSalonRouter);
app.use('/apitime', apiTimeRouter);
app.use('/apiuser', apiUsersRouter);
app.use('/apiProduct', apiProductRouter);
app.use('/service', apiService);
app.use('/apiComment', apiComment);
app.use(api);

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
