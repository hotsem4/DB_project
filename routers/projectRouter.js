import express from 'express';
import { handleProject } from '../controllers/projectController';
import { projectInputProcess } from '../controllers/projectController';

const projectRouter = express.Router();

projectRouter.get('/:id/enroll', handleProject);
projectRouter.get('/:id/');

export default projectRouter;
