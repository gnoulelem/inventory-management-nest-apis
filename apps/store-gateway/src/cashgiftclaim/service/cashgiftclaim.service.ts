import {Injectable} from "@nestjs/common";
import {ICashgiftclaimRepository} from "@store-apis/repositories/cashgiftclaim";
import {ICashgiftclaim, TCreateCashgiftclaim} from "@store-apis/domains/cashgiftclaim";
import {InsertOneResult} from "mongodb";

@Injectable()
export class CashgiftclaimService {
  constructor(private readonly cashgiftclaimRepository: ICashgiftclaimRepository) {
  }

  async createCashgiftclaim(
    entityLike: TCreateCashgiftclaim & {
      readonly id: string;
      readonly createdAt: number;
    }
  ): Promise<InsertOneResult<ICashgiftclaim>> {
    try {
      return await this.cashgiftclaimRepository.create(entityLike);
    } catch (error: unknown) {
      console.error('Error in creating a Cashgiftclaim', error);
      throw error;
    }
  }
}
