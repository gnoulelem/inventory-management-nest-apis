import {IClaimRepository} from "@store-apis/repositories/claim";
import {IClaim, TCreateClaim} from "@store-apis/domains/claim";
import {InsertOneResult} from "mongodb";
import {Injectable} from "@nestjs/common";
import {IClaimProvider} from "@store-apis/data-sources/claim";

@Injectable()
export class ClaimRepository implements IClaimRepository {
  constructor(private readonly claimProvider: IClaimProvider) {
  }

  create(entityLike: TCreateClaim): Promise<InsertOneResult<IClaim>> {
    return this.claimProvider.provider.insertOne(entityLike as IClaim)
  }
}
