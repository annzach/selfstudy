const squel = require('squel').useFlavour('mysql');
const uuid = require('uuid');
const moment = require('moment');

const connection = require('../config/db');

connection.query(`create table if not exists contacts (
    id varchar(50),
    name varchar(50),
    emailid varchar(50),
    phonenum varchar(20),
    dob varchar(20),
    createdat timestamp
  )`, err => {
    if(err) {
      console.log('table create err:', err);
    }
  })

exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('contacts').toString();

    connection.query(sql, (err, contacts) => {
      if(err) {
        reject(err);
      } else {
        resolve(contacts);
      }
    });
  });
};

exports.getOne = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                   .from('contacts')
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, contacts) => {
      let contact = contacts[0];
      //console.log(contacts);
      if(err) {
        reject(err);
      } else if(!contact) {
        reject({error: 'contact not found.'})
      } else {
        resolve(contact);
      }
    });
  });
};

exports.create = function(newContact) {
  return new Promise((resolve, reject) => {
    let timestamp = moment().format('YYYY/MM/DD HH:mm:ss');

    let sql = squel.insert()
                   .into('contacts')
                   .setFields(newContact)
                   .set('id', uuid())
                   .set('createdat', timestamp)
                   .toString();

    connection.query(sql, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
                   .from('contacts')
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, result) => {
      if(result.affectedRows === 0) {
        reject({error: 'contact not found.'})
      } else if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

exports.update = function(id, updateObj) {
  return new Promise((resolve, reject) => {
    delete updateObj.id;
    delete updateObj.createdat;

    let sql = squel.update()
                   .table('contacts')
                   .setFields(updateObj)
                   .where('id = ?', id)
                   .toString();

    connection.query(sql, (err, okObject) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
