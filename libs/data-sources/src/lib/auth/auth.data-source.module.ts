import firebaseAdmin from 'firebase-admin';
import { DynamicModule, Module } from '@nestjs/common';
import { FirebaseAdminAuth } from './provider/auth.provider';
import { ModuleInit } from './core/module.init';

@Module({})
export class AuthDataSourceModule {
  static register(): DynamicModule {
    ModuleInit.init();
    return {
      module: AuthDataSourceModule,
      providers: [
        {
          provide: FirebaseAdminAuth,
          useFactory: (): FirebaseAdminAuth => firebaseAdmin.auth(),
        },
      ],
      exports: [FirebaseAdminAuth],
    };
  }
}
