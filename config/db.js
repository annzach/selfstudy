require('dotenv').config();
const mysql = require('mysql');
const error = require('chalk').white.bgRed.bold;

if(!process.env.MYSQL_PASSWORD) {
  throw error('Missing environment variable: MYSQL_PASSWORD')
}

const connection = mysql.createConnection({
  host: 'localhost',   // url of database
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'testdb'
});

connection.connect();
/* connection.query(`select * from  pets`, (err,rows,fields) => {
    console.log('rows',rows);
    console.log('err',err)
 
  })*/

module.exports = connection;