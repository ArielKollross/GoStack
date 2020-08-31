import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Sherlock Holmes',
      email: 'holmes@email.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Dr.Holmes',
      email: 'holmes_sherlock@email.com',
    });

    expect(updatedUser.name).toBe('Dr.Holmes');
    expect(updatedUser.email).toBe('holmes_sherlock@email.com');
  });

  it('Should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Sherlock Holmes',
      email: 'sherlock_holmes@email.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Professor Moriarty',
      email: 'holmes@email.com',
      password: '123456',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: 'sherlock_holmes@email.com',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('Should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Albert Einstein',
      email: 'einstein@email.com',
      password: '123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      old_password: user.password,
      password: '987654321',
    });

    expect(updatedUser.password).toBe('987654321');
  });

  it('Should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Albert Einstein',
      email: 'einstein@email.com',
      password: '123456',
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      password: '987654321',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Albert Einstein',
      email: 'einstein@email.com',
      password: '123456',
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      old_password: 'wrong-old-password',
      password: '987654321',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Albert Einstein',
      email: 'einstein@email.com',
    })).rejects.toBeInstanceOf(AppError);
  });
});
