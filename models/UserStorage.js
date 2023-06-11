'use strict';

const db = require('../config/db');

class UserStorage {
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM User WHERE id = ?;';
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        // console.log(data[0]);
        resolve(data[0]);
      });
    });
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO User(id, password, name, phone_number) VALUES(?,?,?,?);';
      db.query(
        query,
        [userInfo.id, userInfo.password, userInfo.name, userInfo.phoneNumber],
        (err) => {
          if (err) reject(`${err}`);
          resolve({ success: true });
        }
      );
    });
  }
}

module.exports = UserStorage;
