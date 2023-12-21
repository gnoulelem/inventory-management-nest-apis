import {Collection, Document} from "mongodb";

export * from './store/mongodb.store.provider';
export * from './store/mongodb.store.provider.module';
export * from './claim/mongodb.claim.provider';
export * from './claim/mongodb.claim.provider.module';

export interface IMongoDbProvider<T extends Document> {
  provider: Collection<T>
}
