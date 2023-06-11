import mysql, { createConnection } from 'mysql';

const db = createConnection({
  host: 'bulidrunmate.crpdjgz1wbov.ap-northeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'qudrl975!!',
  database: 'bulidRunMate',
});

db.connect();

module.exports = db;
