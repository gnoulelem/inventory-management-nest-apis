import { IBatchProduct } from '../interface/batchproduct.interface';

export type TDeleteBatchProduct = Omit<IBatchProduct, '_id' | 'createdAt'> & {
  deletion: {
    deletedAt: number;
  };
};
