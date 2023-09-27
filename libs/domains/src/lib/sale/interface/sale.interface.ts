import {
  IProduct,
  IStoreKeeper,
} from '../../batchproduct/interface/batchproduct.interface';
import { IStore } from '../../shared/interface/store.interface';

export interface ISale {
  readonly _id: string;
  readonly id: string;
  readonly items: ISaleItem[];
  readonly meta: ISaleMetadata;
  readonly storeKeeper: IStoreKeeper;
  readonly store: Pick<IStore, 'alias'>;
  readonly bill: IBill;
  readonly insider?: IInsider;
  readonly createdAt: number;
}

export interface ISaleMetadata {
  readonly ipAddress: string;
  readonly deviceOs: string;
  readonly osVersion: string;
  readonly deviceLanguage: string;
  readonly timeZone: string;
}

export interface IInsider {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly phoneNumber: string;
  readonly password: string;
  readonly displayName: string;
  readonly photoURL: string;
  readonly disabled: boolean;
}

export interface IBill {
  readonly amount: number;
  readonly discount: number;
}

export interface ISaleItem {
  readonly product: IProduct;
  readonly batchProductId: string;
  readonly batchProductItemId: string;
}
