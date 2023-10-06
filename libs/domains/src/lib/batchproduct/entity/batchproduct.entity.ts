import {
  IBatchProduct,
  IBatch,
  IBatchProductMetadata,
  IProduct,
  IStoreKeeper,
  IBatchProductItem,
} from '../interface/batchproduct.interface';
import { IStore } from '../../shared/interface/store.interface';

export class BatchProduct implements IBatchProduct {
  readonly _id: string;
  readonly id: string;
  readonly batch: IBatch;
  readonly meta: IBatchProductMetadata;
  readonly product: IProduct;
  readonly storeKeeper: IStoreKeeper;
  readonly store: Pick<IStore, 'alias'>;
  readonly items: IBatchProductItem[];
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(entityLike: IBatchProduct) {
    this._id = entityLike._id;
    this.batch = entityLike.batch;
    this.meta = entityLike.meta;
    this.product = entityLike.product;
    this.storeKeeper = entityLike.storeKeeper;
    this.store = entityLike.store;
    this.items = entityLike.items;
    this.createdAt = entityLike.createdAt;
    this.updatedAt = entityLike.updatedAt;
  }

  static create(entityLike: IBatchProduct): IBatchProduct {
    return new BatchProduct(entityLike);
  }
}
