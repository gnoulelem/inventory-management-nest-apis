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

  retrieve(storeAlias: string, date: string): Promise<ISale[]> {
    const dateObject = new Date(date);
    dateObject.setHours(0, 0, 0, 0);

    const timestamp = dateObject.getTime();
    return this.saleProvider
      .collection<ISale>(storeAlias)
      .find({
        createdAt: {
          $gte: timestamp,
          $lt: dateObject.getTime() + 24 * 60 * 60 * 1000, // Add one day to the specific date
        },
      })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
  }
}
