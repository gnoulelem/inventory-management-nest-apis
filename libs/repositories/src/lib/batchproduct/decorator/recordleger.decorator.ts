import { InsertOneResult, ModifyResult } from 'mongodb';
import {
  IBatchProduct,
  TCreateBatchProduct,
  TDeleteBatchProduct,
  TUpdateBatchProduct,
} from '@store-apis/domains/batchproduct';

export function RecordLeger(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<
    (
      entityLike:
        | TCreateBatchProduct
        | TUpdateBatchProduct
        | TDeleteBatchProduct
    ) => Promise<InsertOneResult<Document> | ModifyResult<IBatchProduct>>
  >
): void {
  const originalMethod = descriptor.value;

  descriptor.value = async function (
    ...args: any[]
  ): Promise<InsertOneResult<Document> | ModifyResult<IBatchProduct>> {
    try {
      const result = await originalMethod.apply(this, args);
      const actualEntry = await this.batchProductProvider
        .collection(args[0].store.alias)
        .findOne({ id: args[0].id });
      args[0].batch.batchId = actualEntry.batch.batchId;
      await this.batchProductLedgerProvider
        .collection(args[0].store.alias)
        .insertOne(args[0]);
      return result;
    } catch (error) {
      console.error(error);
    }
  };
}
