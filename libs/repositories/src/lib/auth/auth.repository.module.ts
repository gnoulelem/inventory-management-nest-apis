import { Module } from '@nestjs/common';
import { AuthDataSourceModule } from '@store-apis/data-sources/auth';
import { IAuthRepository } from './interface/auth.repository.interface';
import { AuthRepository } from './repository/auth.repository';

@Module({
  imports: [AuthDataSourceModule.register()],
  providers: [
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
  ],
  exports: [IAuthRepository],
})
export class AuthRepositoryModule {}
