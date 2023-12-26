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

  retrievePerDate(storeId: string, date: string): Promise<IIncome[]> {
    const dateObject = new Date(date);
    dateObject.setHours(0, 0, 0, 0);

    const timestamp = dateObject.getTime();
    return this.incomeProvider
      .provider
      .find({
        storeId: storeId,
        createdAt: {
          $gte: timestamp,
          $lt: dateObject.getTime() + 24 * 60 * 60 * 1000, // Add one day to the specific date
        },
      })
      .sort({createdAt: -1})
      .toArray();
  }
}
