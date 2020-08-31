import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

const providerRouter = Router();
const providersController = new ProvidersController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providersController.index);

export default providerRouter;
