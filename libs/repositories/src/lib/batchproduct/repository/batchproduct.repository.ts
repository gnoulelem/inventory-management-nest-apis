import { IBatchProductRepository } from '../interface/batchproduct.repository.interface';
import {
  IBatchProduct,
  TCreateBatchProduct,
  TDeleteBatchProduct,
  TUpdateBatchProduct,
} from '@store-apis/domains/batchproduct';
import { Injectable } from '@nestjs/common';
import {
  IBatchProductDbProvider,
  IBatchProductLedgerDbProvider,
} from '@store-apis/data-sources/batchproduct';
import { InsertOneResult, ModifyResult } from 'mongodb';
import { RecordLeger } from '../decorator/recordleger.decorator';

@Injectable()
export class BatchProductRepository implements IBatchProductRepository {
  constructor(
    private readonly batchProductProvider: IBatchProductDbProvider,
    public readonly batchProductLedgerProvider: IBatchProductLedgerDbProvider
  ) {}

  @RecordLeger
  create(
    entityLike: TCreateBatchProduct
  ): Promise<InsertOneResult<TCreateBatchProduct>> {
    return this.batchProductProvider
      .collection<TCreateBatchProduct>(entityLike.store.alias)
      .insertOne(entityLike);
  }

  @RecordLeger
  update(
    entityLike: TUpdateBatchProduct
  ): Promise<ModifyResult<IBatchProduct>> {
    return this.batchProductProvider
      .collection<IBatchProduct>(entityLike.store.alias)
      .findOneAndUpdate(
        { id: entityLike.id },
        {
          $set: entityLike,
        },
        {
          returnDocument: 'after',
        }
      );
  }

  @RecordLeger
  delete(
    entityLike: TDeleteBatchProduct
  ): Promise<ModifyResult<IBatchProduct>> {
    return this.batchProductProvider
      .collection<IBatchProduct>(entityLike.store.alias)
      .findOneAndUpdate(
        { id: entityLike.id },
        {
          $set: entityLike,
        },
        {
          returnDocument: 'after',
        }
      );
  }

  findAvailable(
    storeAlias: string,
    skipValue: number
  ): Promise<IBatchProduct[]> {
    return this.batchProductProvider
      .collection<IBatchProduct>(storeAlias)
      .find({
        $and: [
          {
            items: {
              $elemMatch: {
                saleId: { $exists: false },
              },
            },
          },
          { deletion: { $exists: false } },
        ],
      })
      .skip(skipValue)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
  }

  searchAvailable(storeAlias: string, term: string): Promise<IBatchProduct[]> {
    return this.batchProductProvider
      .collection(storeAlias)
      .aggregate<IBatchProduct>([
        {
          $search: {
            text: {
              query: term,
              path: ['product.name', 'product.description'],
            },
          },
        },
        {
          $match: {
            $and: [
              {
                items: {
                  $elemMatch: {
                    saleId: { $exists: false },
                  },
                },
              },
              { deletion: { $exists: false } },
            ],
          },
        },
      ])
      .toArray();
  }
}
