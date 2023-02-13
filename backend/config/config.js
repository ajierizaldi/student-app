require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_DB_USERNAME,
    "password": process.env.MYSQL_DB_PASSWORD,
    "database": process.env.MYSQL_DB_NAME,
    "host": process.env.MYSQL_DB_HOST,
    "dialect": process.env.MYSQL_DB_DIALECT
  },
  "test": {
    "username": process.env.MYSQL_DB_USERNAME,
    "password": process.env.MYSQL_DB_PASSWORD,
    "database": process.env.MYSQL_DB_NAME,
    "host": process.env.MYSQL_DB_HOST,
    "dialect": process.env.MYSQL_DB_DIALECT
  },
  "production": {
    "username": process.env.MYSQL_DB_USERNAME,
    "password": process.env.MYSQL_DB_PASSWORD,
    "database": process.env.MYSQL_DB_NAME,
    "host": process.env.MYSQL_DB_HOST,
    "dialect": process.env.MYSQL_DB_DIALECT
  }
}
