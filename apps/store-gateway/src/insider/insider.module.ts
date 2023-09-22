import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { InsiderService } from './service/insider.service';
import { InsiderController } from './api/v1/controller/insider.controller';

@Module({
  imports: [HttpModule],
  providers: [InsiderService],
  controllers: [InsiderController],
})
export class InsiderModule {}
