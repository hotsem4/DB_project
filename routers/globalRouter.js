import express from 'express';

const globalRouter = express.Router();

import { join, login } from '../controllers/userController';
import { mainPage, succLogin } from '../controllers/mainController';
import { process } from '../controllers/mainController';
import {
  handleProject,
  projectInputProcess,
  handleProjectInfo,
  hanleUpdateProjectInfo,
  projectUpdateProcess,
  handleProjectDelete,
  handleFindProject,
  projectSearchProcess,
  handleProjectSearch,
  handleProjectSearch_demo,
  projectSupportProcess,
} from '../controllers/projectController';

globalRouter.get('/', mainPage);
globalRouter.get('/login', login);
globalRouter.get('/join', join);
globalRouter.get('/:id/find_projects', handleFindProject);
globalRouter.get('/:id', succLogin);

globalRouter.get('/:id/enroll', handleProject);
globalRouter.get('/:id/search_projects', handleProjectSearch_demo);
globalRouter.get('/:id/:project_id', handleProjectInfo);
globalRouter.get('/:id/:project_id/update', hanleUpdateProjectInfo);

globalRouter.post('/login', process.login);
globalRouter.post('/register', process.register);
globalRouter.post('/:id/search_projects', handleProjectSearch);
globalRouter.post('/:id/:project_id', projectSupportProcess.supportProject);
globalRouter.post('/:id/:project_id/delete', handleProjectDelete);

globalRouter.post('/:id/enroll', projectInputProcess.inputProject);
// globalRouter.post(
//   '/:id/:project_id/update',
//   projectUpdateProcess.updateProject
// );

export default globalRouter;
