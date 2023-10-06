import { IBatchProduct } from '../interface/batchproduct.interface';

export type TCreateBatchProduct = Omit<
  IBatchProduct,
  '_id' | 'updatedAt' | 'createdAt'
>;
