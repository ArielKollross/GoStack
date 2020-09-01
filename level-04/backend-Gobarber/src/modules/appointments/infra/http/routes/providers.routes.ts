import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';
import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController';



const providerRouter = Router();

const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();


providerRouter.use(ensureAuthenticated);

providerRouter.get('/', providersController.index);
providerRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);
providerRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);

export default providerRouter;
