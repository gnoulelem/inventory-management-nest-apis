import { DynamicModule, Module } from '@nestjs/common';
import { IStoreMetaDbProvider } from './provider/storemetadb.provider';
import { MongoClient } from 'mongodb';

@Module({})
export class StoreMetaDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: StoreMetaDataSourceModule,
      providers: [
        {
          provide: IStoreMetaDbProvider,
          useFactory: async (): Promise<IStoreMetaDbProvider> =>
            (
              await new MongoClient(
                process.env['MONGODB_STORE_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('store_meta'),
        },
      ],
      exports: [IStoreMetaDbProvider],
    };
  }
}
