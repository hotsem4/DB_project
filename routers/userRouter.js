import express from 'express';

const userRouter = express.Router();

import { handleEditUser, handleDelete } from '../controllers/userController';

userRouter.get('/edit', handleEditUser);
userRouter.get('/delete', handleDelete);

export default userRouter;
