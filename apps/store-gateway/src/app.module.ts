import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { BatchProductModule } from './batchproduct';
import { EmployeeModule } from './employee';

@Module({
  imports: [BatchProductModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
