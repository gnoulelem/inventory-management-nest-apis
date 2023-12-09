import {Injectable} from "@nestjs/common";
import {ICashgiftclaimRepository} from "@store-apis/repositories/cashgiftclaim";
import {ICashgiftclaim, TCreateCashgiftclaim} from "@store-apis/domains/cashgiftclaim";
import {InsertOneResult} from "mongodb";
import process from "process";
import {PublishCommand} from "@aws-sdk/client-sns";
import {ISaleAwsTopicProvider} from "../provider/saleawstopic.provider";
import {IConfigurationRepository} from "@store-apis/repositories/configuration";

@Injectable()
export class CashgiftclaimService {
  constructor(private readonly cashgiftclaimRepository: ICashgiftclaimRepository,
              private readonly salesAwsTopicProvider: ISaleAwsTopicProvider,
              private readonly configurationRepository: IConfigurationRepository) {
  }

  async createCashgiftclaim(
    entityLike: TCreateCashgiftclaim & {
      readonly id: string;
      readonly createdAt: number;
    }
  ): Promise<InsertOneResult<ICashgiftclaim>> {
    try {
      const storeConfigs = await this.configurationRepository.getStoreConfig(entityLike.store.alias);
      entityLike.claim = {
        amount: entityLike.saleBill.amount * storeConfigs.quidCashGiftConfig.quidCashGiftPercentagePerSale / 100,
      }
      entityLike.currency = storeConfigs.currency;
      const [createResult] = await Promise.all([
        this.cashgiftclaimRepository.create(entityLike),
        this.publishCashgiftclaim(entityLike)
      ])
      return createResult
    } catch (error: unknown) {
      console.error('Error in creating a Cashgiftclaim', error);
      throw error;
    }
  }

  private async publishCashgiftclaim(entityLike: TCreateCashgiftclaim): Promise<void> {
    try {
      if (entityLike.insider) {
        const input = {
          TopicArn: process.env.CASHGIFTCLAIM_AWS_TOPIC_ARN,
          Message: JSON.stringify(entityLike),
        };
        const command = new PublishCommand(input);
        await this.salesAwsTopicProvider.send(command);
      }
    } catch (error: unknown) {
      console.error('Error in publishing a Cashgiftclaim', error);
      throw error;
    }
  }
}
