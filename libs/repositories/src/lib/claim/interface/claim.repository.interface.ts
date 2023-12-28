import {IClaim, TCreateClaim} from "@store-apis/domains/claim";
import {InsertOneResult} from "mongodb";

export abstract class IClaimRepository {
  abstract create(entityLike: TCreateClaim): Promise<InsertOneResult<IClaim>>;

  abstract retrievePerDate(storeId: string, date: string): Promise<IClaim[]>;
}
