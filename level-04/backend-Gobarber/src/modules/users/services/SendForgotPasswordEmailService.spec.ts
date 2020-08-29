import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmail from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmail;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository
    );
  })

  it('Should be able to recover the password using the email', async () => {


    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Issac Newton',
      email: 'newton@deliverymail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'newton@deliverymail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'newton@deliverymail.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
      const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Issac Newton',
      email: 'newton@deliverymail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'newton@deliverymail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);

  });

});
