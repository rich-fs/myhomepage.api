const createError = require('http-errors');
const express = require('express');
const pino = require('pino');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const todoRouter = require('./routes/todo');

const app = express();

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/todo', todoRouter);

// const db = require('./models');

// db.sequelize.sync({ force: true }).then(() => {
//   logger('Drop and Resync Db');
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ message: res.locals.message });
});

module.exports = app;

// set port, listen for requests
app.listen(8080, () => {
  logger.info('Server is running on port 8080.');
});
