import { DynamicModule, Module } from '@nestjs/common';
import { IEmployeeDbProvider } from './provider/employeedb.provider';
import { MongoClient } from 'mongodb';
import { IEmployee } from '@store-apis/domains/employee';

@Module({})
export class EmployeeDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: EmployeeDataSourceModule,
      providers: [
        {
          provide: IEmployeeDbProvider,
          useFactory: async (): Promise<IEmployeeDbProvider> =>
            (
              await new MongoClient(
                process.env['MONGODB_STORE_CLUSTER_CONNECTION_STRING']
              ).connect()
            )
              .db('store_meta')
              .collection<IEmployee>('employees'),
        },
      ],
      exports: [IEmployeeDbProvider],
    };
  }
}
