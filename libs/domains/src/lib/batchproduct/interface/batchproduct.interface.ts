import { IStore } from '../../shared/interface/store.interface';

export interface IBatchProduct {
  readonly _id: string;
  readonly id: string;
  readonly product: IProduct;
  readonly batch: IBatch;
  readonly meta: IBatchProductMetadata;
  readonly storeKeeper: IStoreKeeper;
  readonly store: Pick<IStore, 'alias'>;
  readonly items?: IBatchProductItem[];
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface IProduct {
  readonly name: string;
  readonly description: string;
  readonly unitPrice: string;
  readonly currency: string;
}

export interface IBatch {
  batchId: string;
  size: number;
}

export interface IBatchProductMetadata {
  readonly ipAddress: string;
  readonly deviceOs: string;
  readonly osVersion: string;
  readonly deviceLanguage: string;
  readonly timeZone: string;
}

export interface IStoreKeeper {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly phoneNumber: string;
  readonly password: string;
  readonly displayName: string;
  readonly photoURL: string;
  readonly disabled: boolean;
}

export interface IBatchProductItem {
  readonly itemId: string;
  readonly saleId?: string;
}

export interface IDeletion {
  deletedAt: number;
}
