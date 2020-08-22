import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentServices';


describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsService(fakeAppointmentsRepository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '21312312312321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('21312312312321');
  });

  it('should not be able to create two appointment on the same time', async  () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsService(fakeAppointmentsRepository);

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
