import {Global, Module} from "@nestjs/common";
import {MongoClient} from "mongodb";
import {IMongoDbStoreProvider} from "./mongodb.store.provider";

@Global()
@Module({
  providers: [
    {
      provide: IMongoDbStoreProvider,
      useFactory: async (): Promise<IMongoDbStoreProvider> => (
        await new MongoClient(
          process.env['MONGODB_STORE_CLUSTER_CONNECTION_STRING']!
        ).connect())
    }
  ],
  exports: [IMongoDbStoreProvider]
})
export class MongoDbStoreProviderModule {
}
