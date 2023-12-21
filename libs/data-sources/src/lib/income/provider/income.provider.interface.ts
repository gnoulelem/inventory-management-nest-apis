import {IMongoDbProvider} from "@store-apis/providers/mongodb";
import {Collection} from "mongodb";
import {IIncome} from "@store-apis/domains/income";

export abstract class IIncomeProvider implements IMongoDbProvider<IIncome> {
  abstract provider: Collection<IIncome>;
}
