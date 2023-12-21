import {Module} from "@nestjs/common";
import {ClaimDataSourceModule} from "@store-apis/data-sources/claim";
import {IClaimRepository} from "./interface/claim.repository.interface";
import {ClaimRepository} from "./repository/claim.repository";

@Module({
  imports: [ClaimDataSourceModule],
  providers: [
    {
      provide: IClaimRepository,
      useClass: ClaimRepository
    }
  ],
  exports: [IClaimRepository]
})
export class ClaimRepositoryModule {
}
