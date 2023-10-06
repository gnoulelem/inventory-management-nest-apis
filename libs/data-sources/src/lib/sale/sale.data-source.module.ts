import { DynamicModule, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ISaleDbProvider } from './provider/saledb.provider';

@Module({})
export class SaleDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: SaleDataSourceModule,
      providers: [
        {
          provide: ISaleDbProvider,
          useFactory: async (): Promise<ISaleDbProvider> =>
            (
              await new MongoClient(
                process.env['MONGODB_STORE_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('sales'),
        },
      ],
      exports: [ISaleDbProvider],
    };
  }
}
