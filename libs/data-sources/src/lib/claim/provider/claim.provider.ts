import {Collection} from "mongodb";
import {IClaim} from "@store-apis/domains/claim";
import {IClaimProvider} from "./claim.provider.interface";
import {IMongoDbClaimProvider} from "@store-apis/providers/mongodb";
import {Injectable} from "@nestjs/common";

@Injectable()
export class ClaimProvider implements IClaimProvider {
  provider: Collection<IClaim>;

  constructor(private readonly claimProvider: IMongoDbClaimProvider) {
    this.provider = this.claimProvider.db('operations').collection('claims')
  }
}
