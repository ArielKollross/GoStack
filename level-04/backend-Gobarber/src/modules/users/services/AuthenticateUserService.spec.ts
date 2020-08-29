import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('Should be able to authenticate user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(authenticateUser.execute({
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should be not able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
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
