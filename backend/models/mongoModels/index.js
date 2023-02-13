const config = require('../config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.url;
db.academic = require('./academic.model.js')(mongoose);

module.exports = db;