import {Module} from '@nestjs/common';
import {ConfigurationRepositoryModule} from "@store-apis/repositories/configuration";

import {AppController} from './api/v1/controller/app.controller';
import {AppService} from './api/v1/service/app.service';
import {ClaimRepositoryModule} from "../repositories/claim/claim.repository.module";
import {BillRepositoryModule} from "../repositories/bill/bill.repository.module";
import {IncomeRepositoryModule} from "../repositories/income/income.repository.module";
import {ReferencingRepositoryModule} from "../repositories/referencing/referencing.repository.module";


@Module({
  imports: [ClaimRepositoryModule, BillRepositoryModule, IncomeRepositoryModule, ConfigurationRepositoryModule, ReferencingRepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
