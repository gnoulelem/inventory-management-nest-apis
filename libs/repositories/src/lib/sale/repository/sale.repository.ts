import { ISaleRepository } from '../interface/sale.repository.interface';
import { ISale, TCreateSale } from '@store-apis/domains/sale';
import { InsertOneResult } from 'mongodb';
import { ISaleDbProvider } from '@store-apis/data-sources/sale';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SaleRepository implements ISaleRepository {
  constructor(private readonly saleProvider: ISaleDbProvider) {}

  create(entityLike: TCreateSale): Promise<InsertOneResult<ISale>> {
    return this.saleProvider
      .collection<TCreateSale>(entityLike.store.alias)
      .insertOne(entityLike);
  }

  retrieve(storeAlias: string, skipValue: number): Promise<ISale[]> {
    return this.saleProvider
      .collection<ISale>(storeAlias)
      .find()
      .skip(skipValue)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
  }
}
