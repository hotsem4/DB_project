'use strict';

const UserStorage = require('./UserStorage');

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    console.log(client);
    try {
      const { id, password, userId } = await UserStorage.getUserInfo(client.id);
      console.log('***************');
      console.log(await UserStorage.getUserInfo(client.id));
      console.log(id, password);
      console.log(client.id, client.psword);
      console.log('***************');
      if (id) {
        if (id === client.id && password === client.psword) {
          return { success: true };
        }
        return { success: false, msg: '비밀번호가 틀렸습니다.' };
      }
      return { success: false, msg: '존재하지 않는 아이디입니다.' };
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
