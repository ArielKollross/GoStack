import { Router } from 'express';
import multer from 'multer'
import uploadConfig from '@config/upload';

import UserController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', userController.create);
usersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
