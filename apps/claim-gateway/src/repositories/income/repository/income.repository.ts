import {IIncomeRepository} from "../interface/income.repository.interface";
import {InsertOneResult} from "mongodb";
import {IIncome} from "../../../domains/income";
import {IIncomeProvider} from "../../../data-sources/income/provider/income.provider";
import {Injectable} from "@nestjs/common";

@Injectable()
export class IncomeRepository implements IIncomeRepository {
  constructor(private readonly incomeProvider: IIncomeProvider) {
  }

  create(entityLike: IIncome): Promise<InsertOneResult<IIncome>> {
    return this.incomeProvider.insertOne(entityLike)
  }
}
