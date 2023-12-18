import {Module} from "@nestjs/common";
import {ClaimDataSourceModule} from "../../data-sources/claim";
import {IClaimRepository} from "./interface/claim.repository.interface";
import {ClaimRepository} from "./repository/claim.repository";

@Module({
  imports: [ClaimDataSourceModule.forFeatureAsync()],
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
