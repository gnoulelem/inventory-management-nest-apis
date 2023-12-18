import {InsertOneResult} from "mongodb";
import {IIncome} from "../../../domains/income";

export abstract class IIncomeRepository {
  abstract create(entityLike: IIncome): Promise<InsertOneResult<IIncome>>
}
