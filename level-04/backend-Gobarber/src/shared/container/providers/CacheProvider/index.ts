import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import RedisCacheProvider from './Implementations/RedisCacheProvider';

const providers = {
  redis: RedisCacheProvider,
}

container.registerSingleton<IStorageProvider>(
  'CacheProvider',
  providers.redis,
);
