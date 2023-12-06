import {Injectable} from "@nestjs/common";
import {ICashgiftclaimRepository} from "../interface/cashgiftclaim.repository.interface";
import {ICashgiftclaim, TCreateCashgiftclaim} from "@store-apis/domains/cashgiftclaim";
import {InsertOneResult} from "mongodb";
import {ICashgiftclaimdbProvider} from "@store-apis/data-sources/cashgiftclaim";

@Injectable()
export class CashgiftclaimRepository implements ICashgiftclaimRepository {
  constructor(private readonly cashgiftclaimProvider: ICashgiftclaimdbProvider) {
  }

  create(entityLike: TCreateCashgiftclaim): Promise<InsertOneResult<ICashgiftclaim>> {
    return this.cashgiftclaimProvider
      .collection<TCreateCashgiftclaim>(entityLike.store.alias)
      .insertOne(entityLike);
  }
}
