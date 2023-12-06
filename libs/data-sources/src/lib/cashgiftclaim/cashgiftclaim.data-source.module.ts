import {DynamicModule} from "@nestjs/common";
import {MongoClient} from "mongodb";
import {ICashgiftclaimdbProvider} from "./provider/cashgiftclaimdb.provider";

export class CashgiftclaimDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: CashgiftclaimDataSourceModule,
      providers: [
        {
          provide: ICashgiftclaimdbProvider,
          useFactory: async (): Promise<ICashgiftclaimdbProvider> =>
            (
              await new MongoClient(
                process.env['MONGODB_STORE_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('cashgiftclaims'),
        },
      ],
      exports: [ICashgiftclaimdbProvider],
    };
  }
}
