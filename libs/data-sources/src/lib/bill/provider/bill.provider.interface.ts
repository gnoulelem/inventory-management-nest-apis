import {IMongoDbProvider} from "@store-apis/providers/mongodb";
import {IBill} from "@store-apis/domains/bill";
import {Collection} from "mongodb";

export abstract class IBillProvider implements IMongoDbProvider<IBill> {
  abstract provider: Collection<IBill>;
}
