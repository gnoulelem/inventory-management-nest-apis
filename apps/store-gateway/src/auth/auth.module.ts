import { Module } from '@nestjs/common';
import { AuthController } from './api/v1/controller/auth.controller';
import { AuthService } from './service/auth.service';
import { AuthRepositoryModule } from '@store-apis/repositories/auth';

@Module({
  imports: [AuthRepositoryModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
