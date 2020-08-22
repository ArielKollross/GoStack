import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Batman',
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should be not able to create a new user with already used email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

     await createUser.execute({
      name: 'Batman',
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    });

    expect(
      createUser.execute({
        name: 'Batman',
        email: 'batman@email.com',
        password: 'BatSecretPassword',
      })
    ).rejects.toBeInstanceOf(AppError);

  });
});
