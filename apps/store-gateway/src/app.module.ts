import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { CustomerModule } from './customer';
import { BatchProductModule } from './batchproduct';

@Module({
  imports: [CustomerModule, BatchProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
