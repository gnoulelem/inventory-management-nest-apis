import {Module} from "@nestjs/common";
import {CashgiftclaimDataSourceModule} from "@store-apis/data-sources/cashgiftclaim";
import {ICashgiftclaimRepository} from "./interface/cashgiftclaim.repository.interface";
import {CashgiftclaimRepository} from "./repository/cashgiftclaim.repository";

@Module({
  imports: [CashgiftclaimDataSourceModule.forFeatureAsync()],
  providers: [
    {
      provide: ICashgiftclaimRepository,
      useClass: CashgiftclaimRepository
    }
  ],
  exports: [ICashgiftclaimRepository]
})
export class CashgiftclaimRepositoryModule {
}
