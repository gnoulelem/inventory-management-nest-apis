import { IBatchProduct } from '../interface/batchproduct.interface';

export type TUpdateBatchProduct = Omit<IBatchProduct, '_id' | 'createdAt'>;
