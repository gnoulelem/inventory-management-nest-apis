import { DynamicModule, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { IBatchProductDbProvider } from './provider/batchproductdb.provider';
import { IBatchProductLedgerDbProvider } from './provider/batchproductledgerdb.provider';

@Module({})
export class BatchProductDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: BatchProductDataSourceModule,
      providers: [
        {
          provide: IBatchProductDbProvider,
          useFactory: async (): Promise<IBatchProductDbProvider> =>
            (
              await new MongoClient(
                process.env['MONGODB_STORE_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('batch_products'),
        },
        {
          provide: IBatchProductLedgerDbProvider,
          useFactory: async (): Promise<IBatchProductLedgerDbProvider> =>
            (
              await new MongoClient(
                process.env['MONGODB_STORE_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('batch_products_ledger'),
        },
      ],
      exports: [IBatchProductDbProvider, IBatchProductLedgerDbProvider],
    };
  }
}
