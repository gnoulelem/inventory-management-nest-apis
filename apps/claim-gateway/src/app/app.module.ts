import {Module} from '@nestjs/common';
import {ConfigurationRepositoryModule} from "@store-apis/repositories/configuration";

import {AppController} from './api/v1/controller/app.controller';
import {AppService} from './api/v1/service/app.service';
import {BillRepositoryModule} from "@store-apis/repositories/bill";
import {IncomeRepositoryModule} from "@store-apis/repositories/income";
import {ReferencingRepositoryModule} from "@store-apis/repositories/referencing";
import {AuthRepositoryModule} from "@store-apis/repositories/auth";
import {InsiderRepositoryModule} from "@store-apis/repositories/insider";
import {ClaimRepositoryModule} from "@store-apis/repositories/claim";
import {MongoDbClaimProviderModule} from "@store-apis/providers/mongodb";


@Module({
  imports: [
    MongoDbClaimProviderModule,
    ClaimRepositoryModule,
    BillRepositoryModule,
    IncomeRepositoryModule,
    ConfigurationRepositoryModule,
    ReferencingRepositoryModule,
    AuthRepositoryModule,
    InsiderRepositoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
