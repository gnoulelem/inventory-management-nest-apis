import {DynamicModule} from "@nestjs/common";
import {Collection, MongoClient} from "mongodb";
import {IIncome} from "../../domains/income";
import {IIncomeProvider} from "./provider/income.provider";

export class IncomeDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: IncomeDataSourceModule,
      providers: [
        {
          provide: IIncomeProvider,
          useFactory: async (): Promise<Collection<IIncome>> => (
            (
              await new MongoClient(
                process.env['MONGODB_CLAIM_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('operations').collection<IIncome>('incomes')
          )
        }
      ],
      exports: [IIncomeProvider]
    }
  }
}
