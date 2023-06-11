const ProjectStorage = require('./ProjectStorage');

class Project {
  constructor(body) {
    this.body = body;
  }

  async input_projectDate() {
    const info = this.body;
    try {
      const response = await ProjectStorage.projectSave(info);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async update_projectDate() {
    const info = this.body;
    try {
      const response = await ProjectStorage.projectUpdate(info);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async search_projectDate() {
    const info = this.body;
    try {
      const response = await ProjectStorage.projectSearch(info);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async support_project() {
    const info = this.body;
    try {
      const respone = await ProjectStorage.projectSupport(info);
      return respone;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Project;
