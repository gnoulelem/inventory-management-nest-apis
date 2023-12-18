import {IClaim, TCreateClaim} from "../../../domains/claim";
import {InsertOneResult} from "mongodb";

export abstract class IClaimRepository {
  abstract create(entityLike: TCreateClaim): Promise<InsertOneResult<IClaim>>
}
