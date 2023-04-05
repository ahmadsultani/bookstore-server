const mongoose = require('mongoose');

const { dbUrl } = require('../../config');

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

module.exports = db;