import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClaimRepositoryModule} from "../repositories/claim/claim.repository.module";
import {BillRepositoryModule} from "../repositories/bill/bill.repository.module";
import {IncomeRepositoryModule} from "../repositories/income/income.repository.module";

@Module({
  imports: [ClaimRepositoryModule, BillRepositoryModule, IncomeRepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
