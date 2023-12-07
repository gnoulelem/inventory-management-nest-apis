import {Module} from "@nestjs/common";
import {CashgiftclaimRepositoryModule} from "@store-apis/repositories/cashgiftclaim";
import {CashgiftclaimService} from "./service/cashgiftclaim.service";
import {CashgiftclaimController} from "./api/v1/controller/cashgiftclaim.controller";
import {AuthRepositoryModule} from "@store-apis/repositories/auth";
import {ISaleAwsTopicProvider} from "./provider/saleawstopic.provider";
import {SNSClient} from "@aws-sdk/client-sns";
import process from "process";

@Module({
  imports: [CashgiftclaimRepositoryModule, AuthRepositoryModule],
  providers: [CashgiftclaimService, {
    provide: ISaleAwsTopicProvider,
    useFactory: () => new SNSClient({region: process.env.AWS_REGION}),
  },],
  controllers: [CashgiftclaimController]
})
export class CashgiftclaimModule {
}
