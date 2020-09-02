import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  })

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Batman',
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should be not able to create a new user with already used email', async () => {
     await createUser.execute({
      name: 'Batman',
      email: 'batman@email.com',
      password: 'BatSecretPassword',
    });

    await expect(
      createUser.execute({
        name: 'Batman',
        email: 'batman@email.com',
        password: 'BatSecretPassword',
      })
    ).rejects.toBeInstanceOf(AppError);

  });
});
