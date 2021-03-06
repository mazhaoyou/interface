const mysql = require('mysql');
const config = require('../config/config.js');

const database = mysql.createConnection({
    host: config.host,
    user: config.user,
    port: config.port,
    password: config.password,
    database: config.database,
    multipleStatements: true //允许执行多条语句

});

database.connect();

module.exports = database;