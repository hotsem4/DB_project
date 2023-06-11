const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
import morgan from 'morgan';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import projectRouter from './routers/projectRouter';

const PORT = 8000;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));
const logger = morgan('dev');
app.use(logger);

app.use('/', globalRouter);
app.use('/user', userRouter);
app.use('/project', projectRouter);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`http://localhost:${PORT}`);
});
