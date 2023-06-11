'use strict';

const db = require('../config/db');
const bcrypt = require('bcrypt');

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

  //   static async save(userInfo) {
  //     return new Promise((resolve, reject) => {
  //       const saltRounds = 10;

  //       const plainTextPassword = userInfo.password;

  //       bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  //         if (err) {
  //           console.error(err);
  //           return;
  //         }
  //         console.log('Password hash : ', hash);
  //       });
  //       const query =
  //         'INSERT INTO User(id, password, name, phone_number) VALUES(?,?,?,?);';
  //       db.query(
  //         query,
  //         [userInfo.id, hash, userInfo.name, userInfo.phoneNumber],
  //         (err) => {
  //           if (err) reject(`${err}`);
  //           resolve({ success: true });
  //         }
  //       );
  //     });
  //   }
  // }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const saltRounds = 10;

      const plainTextPassword = userInfo.password;

      bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
        if (err) {
          console.error(err);
          return;
        }
        const query =
          'INSERT INTO User(id, password, name, phone_number) VALUES(?,?,?,?);';
        db.query(
          query,
          [userInfo.id, hash, userInfo.name, userInfo.phoneNumber],
          (err) => {
            if (err) reject(`${err}`);
            resolve({ success: true });
          }
        );
      });
    });
  }
}

module.exports = UserStorage;
