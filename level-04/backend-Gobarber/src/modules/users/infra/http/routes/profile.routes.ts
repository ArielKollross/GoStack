import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

const profileRouter = Router();
const userController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', userController.show);
profileRouter.put('/', userController.update);

export default profileRouter;
