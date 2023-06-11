const { resolveInclude } = require('ejs');
const db = require('../config/db');

class ProjectStorage {
  static async projectSave(projectInfo) {
    return new Promise((resolve, reject) => {
      console.log(projectInfo);
      const query =
        'INSERT INTO Project(project_name, project_info, recruitment_start, recruitment_end, project_start, project_end, recruitment_number, dev_env, major_lang1, major_lang2, major_lang3, recru_stat, dev_stat, writer_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);';
      db.query(
        query,
        [
          projectInfo.project_name,
          projectInfo.project_info,
          projectInfo.recruitment_start,
          projectInfo.recruitment_end,
          projectInfo.project_start,
          projectInfo.project_end,
          projectInfo.recruitment_number,
          projectInfo.dev_env,
          projectInfo.major_lang1,
          projectInfo.major_lang2,
          projectInfo.major_lang3,
          projectInfo.recru_stat,
          projectInfo.dev_stat,
          projectInfo.writer_id,
        ],
        (err, results) => {
          console.log('****************');
          console.log(results);
          console.log('****************');
          if (err) {
            if (err.code !== 'ER_DBERROR') {
              throw err;
            }
            reject(`${err}`);
          } else {
            console.log(results);
            const projectId = results.insertId;
            // Add the record to the User_Projects table
            const userProjectQuery =
              'INSERT INTO User_Projects(id, project_id, role) VALUES (?, ?, ?);';
            db.query(
              userProjectQuery,
              [projectInfo.writer_id, projectId, 'leader'],
              (err, userProjectResults) => {
                if (err) {
                  reject(`${err}`);
                } else {
                  console.log(userProjectResults);
                  resolve({ success: true, projectId: projectId });
                }
              }
            );
          }
        }
      );
    });
  }

  static async projectSearch(projectInfo) {
    const searchFormat = `%${projectInfo.searchText}%`;
    console.log(searchFormat);
    return new Promise((resolve, reject) => {
      const query = `SELECT p.*,
        (SELECT COUNT(*) FROM User_Projects up WHERE up.project_id = p.project_id) AS volunteer_count
        FROM Project p
        WHERE p.writer_id LIKE CONCAT('%', ?, '%')
        OR p.project_info LIKE CONCAT('%', ?, '%')
        OR p.project_name LIKE CONCAT('%', ?, '%');`;
      db.query(
        query,
        [
          projectInfo.searchText,
          projectInfo.searchText,
          projectInfo.searchText,
        ],
        (err, results) => {
          if (err) {
            if (err.code != 'ER_DBERROR') {
              throw err;
            }
            reject(`${err}`);
          } else {
            console.log(results);
            resolve({ success: true, projectData: results });
          }
        }
      );
    });
  }

  static async projectUpdate(projectInfo) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE bulidRunMate.Project SET project_name = ?, project_info = ?, recruitment_start = ?, recruitment_end = ?, project_start = ?, project_end = ?, recruitment_number = ?, dev_env = ?, major_lang1 = ?, major_lang2 = ?, major_lang3 = ?, recru_stat = ?, dev_stat = ? WHERE (project_id = ?);`;
      console.log(projectInfo);
      db.query(
        query,
        [
          projectInfo.project_name,
          projectInfo.project_info,
          projectInfo.recruitment_start,
          projectInfo.recruitment_end,
          projectInfo.project_start,
          projectInfo.project_end,
          projectInfo.recruitment_number,
          projectInfo.dev_env,
          projectInfo.major_lang1,
          projectInfo.major_lang2,
          projectInfo.major_lang3,
          projectInfo.recru_stat,
          projectInfo.dev_stat,
          projectInfo.project_id,
        ],
        (err, results) => {
          if (err) {
            if (err.code !== 'ER_DBERROR') {
              throw err;
            }
            reject(`${err}`);
          } else {
            console.log('results : ');
            console.log(results);
            resolve({ success: true });
          }
        }
      );
    });
  }

  static async projectSupport(projectInfo) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO bulidRunMate.User_Projects (id, project_id, role) VALUES (?, ?, ?);`;
      db.query(
        query,
        [projectInfo.id, projectInfo.projectId, projectInfo.role],
        (err, results) => {
          if (err) {
            if (err.code !== 'ER_DBERROR') {
              throw err;
            }
            reject(`${err}`);
          } else {
            resolve({ success: true });
          }
        }
      );
    });
  }
}

module.exports = ProjectStorage;
