import { InsertOneResult } from 'mongodb';
import { ISale, TCreateSale } from '@store-apis/domains/sale';

export abstract class ISaleRepository {
  abstract create(entityLike: TCreateSale): Promise<InsertOneResult<ISale>>;

  abstract retrieve(storeAlias: string, date: string): Promise<ISale[]>;
}
