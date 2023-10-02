import { InsertOneResult } from 'mongodb';
import { ISale, TCreateSale } from '@store-apis/domains/sale';

export abstract class ISaleRepository {
  abstract create(entityLike: TCreateSale): Promise<InsertOneResult<ISale>>;

  abstract retrievePerDate(storeAlias: string, date: string): Promise<ISale[]>;

  abstract countAllSales(storeAlias: string): Promise<number>;

  abstract retrieveSalePerId(storeAlias: string, id: string): Promise<ISale>;
}
