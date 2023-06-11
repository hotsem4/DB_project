'use strict';

const UserStorage = require('./UserStorage');
const bcrypt = require('bcrypt');

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      const { id, password, userId } = await UserStorage.getUserInfo(client.id);

      if (id && id === client.id) {
        const isMatch = await new Promise((resolve, reject) => {
          bcrypt.compare(client.psword, password, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });

        if (isMatch) {
          return { success: true };
        } else {
          return { success: false, msg: '비밀번호가 일치하지 않습니다.' };
        }
      }
      return { success: false, msg: 'This ID does not exist.' };
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async register() {
    const client = this.body;
    try {
      const response = await UserStorage.save(client);
      console.log(response);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = User;
