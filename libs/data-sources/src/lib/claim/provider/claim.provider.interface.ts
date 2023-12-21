import {IMongoDbProvider} from "@store-apis/providers/mongodb";
import {Collection} from "mongodb";
import {IClaim} from "@store-apis/domains/claim";

export abstract class IClaimProvider implements IMongoDbProvider<IClaim> {
  abstract provider: Collection<IClaim>;
}
