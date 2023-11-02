import {
  IBatchProduct,
  TCreateBatchProduct,
  TUpdateBatchProduct,
  TDeleteBatchProduct,
} from '@store-apis/domains/batchproduct';
import { InsertOneResult, ModifyResult, UpdateResult } from 'mongodb';

export abstract class IBatchProductRepository {
  abstract create(
    entityLike: TCreateBatchProduct
  ): Promise<InsertOneResult<TCreateBatchProduct>>;

  abstract update(
    entityLike: TUpdateBatchProduct
  ): Promise<ModifyResult<IBatchProduct>>;

  abstract delete(
    entityLike: TDeleteBatchProduct
  ): Promise<ModifyResult<IBatchProduct>>;

  abstract findAvailable(
    storeAlias: string,
    skipValue: number
  ): Promise<IBatchProduct[]>;

  abstract searchAvailable(
    storeAlias: string,
    term: string
  ): Promise<IBatchProduct[]>;

  abstract addSaleIdToItem({
    store: { alias },
    batchProductId,
    batchProductItemId,
    saleId,
  }: {
    store: { alias: string };
    batchProductId: string;
    batchProductItemId: string;
    saleId: string;
  }): Promise<UpdateResult<IBatchProduct>>;

  abstract find(
    storeAlias: string,
    skipValue: number
  ): Promise<IBatchProduct[]>;

  abstract search(
    storeAlias: string,
    term: string
  ): Promise<IBatchProduct[]>;
}
