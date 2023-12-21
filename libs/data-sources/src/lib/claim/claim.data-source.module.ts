import {Module} from "@nestjs/common";
import {ClaimProvider} from "./provider/claim.provider";
import {IClaimProvider} from "./provider/claim.provider.interface";

@Module({
  providers: [
    {
      provide: IClaimProvider,
      useClass: ClaimProvider
    }
  ],
  exports: [IClaimProvider]
})
export class ClaimDataSourceModule {
}
