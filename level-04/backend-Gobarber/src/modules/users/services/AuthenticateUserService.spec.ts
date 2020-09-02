import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  })

  it('Should be able to authenticate user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Batman',
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    });

    const response = await authenticateUser.execute({
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existing user', async () => {
   await expect(authenticateUser.execute({
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Batman',
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    });

    await expect(authenticateUser.execute({
      email: 'batman@email.com',
      password: 'batata',
    })).rejects.toBeInstanceOf(AppError);
  });
});
