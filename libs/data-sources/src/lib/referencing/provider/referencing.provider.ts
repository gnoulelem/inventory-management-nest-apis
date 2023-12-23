import {Collection} from "mongodb";
import {IMongoDbClaimProvider} from "@store-apis/providers/mongodb";
import {Injectable} from "@nestjs/common";
import {IReferencingProvider} from "./referencing.provider.interface";
import {IReferencing} from "@store-apis/domains/referencing";

@Injectable()
export class ReferencingProvider implements IReferencingProvider {
  provider: Collection<IReferencing>;

  constructor(private readonly claimProvider: IMongoDbClaimProvider) {
    this.provider = this.claimProvider.db('operations').collection('referencings')
  }
}

