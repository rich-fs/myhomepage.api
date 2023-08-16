const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  DB: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  DIALECT: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  ssl: isDev ? false : {
    require: true,
    rejectUnauthorized: false,
  },
};
