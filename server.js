require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const pino = require('pino');
const cors = require('cors');

const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const maintenanceRouter = require('./routes/maintenance');
const todoRouter = require('./routes/todo');

const router = express.Router();
const app = express();

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/maintenance', maintenanceRouter);
app.use('/todo', todoRouter);

// Catch 404 and forward to error handler.
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.json({ message: res.locals.message });
});

module.exports = app;

// Set port & listen for requests.
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
