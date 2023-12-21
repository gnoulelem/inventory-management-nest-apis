import {Collection} from "mongodb";
import {IMongoDbClaimProvider} from "@store-apis/providers/mongodb";
import {Injectable} from "@nestjs/common";
import {IIncomeProvider} from "./income.provider.interface";
import {IIncome} from "@store-apis/domains/income";

@Injectable()
export class IncomeProvider implements IIncomeProvider {
  provider: Collection<IIncome>;

  constructor(private readonly claimProvider: IMongoDbClaimProvider) {
    this.provider = this.claimProvider.db('operations').collection('incomes')
  }
}
