import {Module} from "@nestjs/common";
import {CashgiftclaimRepositoryModule} from "@store-apis/repositories/cashgiftclaim";
import {CashgiftclaimService} from "./service/cashgiftclaim.service";
import {CashgiftclaimController} from "./api/v1/controller/cashgiftclaim.controller";
import {AuthRepositoryModule} from "@store-apis/repositories/auth";

@Module({
  imports: [CashgiftclaimRepositoryModule, AuthRepositoryModule],
  providers: [CashgiftclaimService],
  controllers: [CashgiftclaimController]
})
export class CashgiftclaimModule {}
