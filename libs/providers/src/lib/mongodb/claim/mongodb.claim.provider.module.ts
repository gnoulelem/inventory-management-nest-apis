import {Global, Module} from "@nestjs/common";
import {MongoClient} from "mongodb";
import {IMongoDbClaimProvider} from "./mongodb.claim.provider";

@Global()
@Module({
  providers: [
    {
      provide: IMongoDbClaimProvider,
      useFactory: async (): Promise<IMongoDbClaimProvider> => (
        await new MongoClient(
          process.env['MONGODB_CLAIM_CLUSTER_CONNECTION_STRING']!
        ).connect())
    }
  ],
  exports: [IMongoDbClaimProvider]
})
export class MongoDbClaimProviderModule {}
