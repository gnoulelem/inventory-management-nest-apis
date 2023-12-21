import {IMongoDbProvider} from "@store-apis/providers/mongodb";
import {Collection} from "mongodb";
import {IReferencing} from "@store-apis/domains/referencing";

export abstract class IReferencingProvider implements IMongoDbProvider<IReferencing> {
  abstract provider: Collection<IReferencing>;
}
