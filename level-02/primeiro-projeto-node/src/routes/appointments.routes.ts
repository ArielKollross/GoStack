import { Router, request, response } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (request, response) => {
  return response.json({message: 'Hello Word'});
});

export default appointmentsRouter;
