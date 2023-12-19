import {IClaimRepository} from "../interface/claim.repository.interface";
import {IClaim, TCreateClaim} from "../../../domains/claim";
import {InsertOneResult} from "mongodb";
import {IClaimProvider} from "../../../data-sources/claim/provider/claim.provider";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ClaimRepository implements IClaimRepository {
  constructor(private readonly claimProvider: IClaimProvider) {
  }

  create(entityLike: TCreateClaim): Promise<InsertOneResult<IClaim>> {
    return this.claimProvider.insertOne(entityLike)
  }

}
