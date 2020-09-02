import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvider: ListProviderService;


describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvider = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it('Should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Son Goku',
      email: 'goku@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Dead Pool',
      email: 'deadpool@email.com',
      password: '123456',
    });

    const  loggedUser = await fakeUsersRepository.create({
      name: 'Mega Man',
      email: 'megaman@email.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
