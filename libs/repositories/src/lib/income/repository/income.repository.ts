import {IIncomeRepository} from "@store-apis/repositories/income";
import {InsertOneResult} from "mongodb";
import {IIncome} from "@store-apis/domains/income";
import {Injectable} from "@nestjs/common";
import {IIncomeProvider} from "@store-apis/data-sources/income";

@Injectable()
export class IncomeRepository implements IIncomeRepository {
  constructor(private readonly incomeProvider: IIncomeProvider) {
  }

  create(entityLike: IIncome): Promise<InsertOneResult<IIncome>> {
    return this.incomeProvider.provider.insertOne(entityLike)
  }
}
