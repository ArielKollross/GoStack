import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {

  const user_id = request.user.id;
  const { provider_id, date } = request.body;

  // with the validation, dont need more this validation
  //const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentServices);

  const appointment = await createAppointment.execute({
    date,
    user_id,
    provider_id,
  });

  return response.json(appointment);
  }
}
