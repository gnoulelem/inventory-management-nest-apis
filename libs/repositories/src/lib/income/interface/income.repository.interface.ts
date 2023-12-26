import {InsertOneResult} from "mongodb";
import {IIncome} from "@store-apis/domains/income";

export abstract class IIncomeRepository {
  abstract create(entityLike: IIncome): Promise<InsertOneResult<IIncome>>;

  abstract retrievePerDate(storeId: string, date: string): Promise<IIncome[]>;
}
