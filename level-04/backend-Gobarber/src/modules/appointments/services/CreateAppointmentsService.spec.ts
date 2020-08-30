import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentServices';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentsService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {


    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '21312312312321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('21312312312321');
  });

  it('should not be able to create two appointment on the same time', async  () => {
    const appointmentDate = new Date(2020, 4, 13, 22);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '21312312312321',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '21312312312321',
      })
    ).rejects.toBeInstanceOf(AppError);

  });
});
