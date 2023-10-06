import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthRepositoryModule } from '@store-apis/repositories/auth';
import { InsiderService } from './service/insider.service';
import { InsiderController } from './api/v1/controller/insider.controller';

@Module({
  imports: [HttpModule, AuthRepositoryModule],
  providers: [InsiderService],
  controllers: [InsiderController],
})
export class InsiderModule {}
