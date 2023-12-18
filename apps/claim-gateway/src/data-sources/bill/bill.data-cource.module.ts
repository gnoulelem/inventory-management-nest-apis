import {DynamicModule} from "@nestjs/common";
import {IBillProvider} from "./provider/bill.provider";
import {Collection, MongoClient} from "mongodb";
import {IBill} from "../../domains/bill";

export class BillDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: BillDataSourceModule,
      providers: [
        {
          provide: IBillProvider,
          useFactory: async (): Promise<Collection<IBill>> => (
            (
              await new MongoClient(
                process.env['MONGODB_CLAIM_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('operations').collection<IBill>('bills')
          )
        }
      ],
      exports: [IBillProvider]
    }
  }
}
