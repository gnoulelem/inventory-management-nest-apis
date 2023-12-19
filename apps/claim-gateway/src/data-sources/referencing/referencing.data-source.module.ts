import {DynamicModule} from "@nestjs/common";
import {IReferencingProvider} from "./provider/referencing.provider";
import {MongoClient} from "mongodb";
import {IReferencing} from "../../domains/referencing";

export class ReferencingDataSourceModule {
  static forFeatureAsync(): DynamicModule {
    return {
      module: ReferencingDataSourceModule,
      providers: [
        {
          provide: IReferencingProvider,
          useFactory: async (): Promise<IReferencingProvider> => (
            (
              await new MongoClient(
                process.env['MONGODB_CLAIM_CLUSTER_CONNECTION_STRING']
              ).connect()
            ).db('operations').collection<IReferencing>('referencings')
          )
        }
      ],
      exports: [IReferencingProvider]
    }
  }
}
