import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { EmployeeModule } from './employee';
import { InsiderModule } from './insider';
import { ConfigurationModule } from './configuration';
import {AuthModule} from "./auth";
import {CashgiftclaimModule} from "./cashgiftclaim";

@Module({
  imports: [
    EmployeeModule,
    InsiderModule,
    ConfigurationModule,
    AuthModule,
    CashgiftclaimModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
