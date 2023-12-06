import {ICashgiftclaim, TCreateCashgiftclaim} from "@store-apis/domains/cashgiftclaim";
import {InsertOneResult} from "mongodb";

export abstract class ICashgiftclaimRepository {
  abstract create(entityLike: TCreateCashgiftclaim): Promise<InsertOneResult<ICashgiftclaim>>
}
