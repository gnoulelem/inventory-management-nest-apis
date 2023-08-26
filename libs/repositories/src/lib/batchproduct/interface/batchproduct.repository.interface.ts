import {
  IBatchProduct,
  TCreateBatchProduct,
  TUpdateBatchProduct,
  TDeleteBatchProduct,
} from '@store-apis/domains/batchproduct';
import { InsertOneResult, ModifyResult } from 'mongodb';

export abstract class IBatchProductRepository {
  abstract create(
    entityLike: TCreateBatchProduct
  ): Promise<InsertOneResult<Document>>;

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
}
