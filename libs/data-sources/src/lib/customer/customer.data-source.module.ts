import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseAdminAuth } from './provider/firebase-auth.provider';
import firebaseAdmin from 'firebase-admin';
import { ModuleInit } from './core/module.init';

@Module({})
export class CustomerDataSourceModule {
  static register(): DynamicModule {
    ModuleInit.init();
    return {
      module: CustomerDataSourceModule,
      providers: [
        {
          provide: FirebaseAdminAuth,
          useFactory: (): FirebaseAdminAuth =>
            firebaseAdmin.app('customer-app').auth(),
        },
      ],
      exports: [FirebaseAdminAuth],
    };
  }
}
