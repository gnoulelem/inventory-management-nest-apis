import { IStore } from '../../batchproduct/interface/batchproduct.interface';

export interface IEmployee {
  readonly uid: string;
  readonly store: IStore;
  readonly createdAt: number;
  readonly updatedAt: number;
}
