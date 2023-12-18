import {DynamicModule} from "@nestjs/common";
import {Collection, MongoClient} from "mongodb";
import {IClaimProvider} from "./provider/claim.provider";
import {IClaim} from "../../domains/claim";

export class ClaimDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: ClaimDataSourceModule,
      providers: [
        {
          provide: IClaimProvider,
          useFactory: async (): Promise<Collection<IClaim>> => (
            (
              await new MongoClient(
                process.env['MONGODB_CLAIM_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('operations').collection<IClaim>('claims')
          )
        }
      ],
      exports: [IClaimProvider]
    }
  }
}
