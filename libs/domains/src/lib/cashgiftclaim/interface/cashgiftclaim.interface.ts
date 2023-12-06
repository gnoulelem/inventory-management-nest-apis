import {IStoreKeeper} from "@store-apis/domains/batchproduct";
import {IStore} from "@store-apis/domains/shared";

export interface ICashgiftclaim {
  readonly _id: string;
  readonly id: string;
  readonly insider: IInsider;
  readonly meta: IMetadata;
  readonly storeKeeper: IStoreKeeper;
  readonly store: Pick<IStore, 'alias'>;
  readonly saleBill: IBill;
  readonly createdAt: number;
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

export interface IMetadata {
  readonly ipAddress: string;
  readonly deviceOs: string;
  readonly osVersion: string;
  readonly deviceLanguage: string;
  readonly timeZone: string;
}

export interface IBill {
  readonly amount: number;
}
