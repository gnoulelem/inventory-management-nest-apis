import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { BatchProductModule } from './batchproduct';
import { EmployeeModule } from './employee';
import { InsiderModule } from './insider';
import { SaleModule } from './sale';
import { ConfigurationModule } from './configuration';

@Module({
  imports: [
    BatchProductModule,
    EmployeeModule,
    InsiderModule,
    SaleModule,
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
