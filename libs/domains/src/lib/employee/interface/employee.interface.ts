import { IStore } from '../../shared/interface/store.interface';

export interface IEmployee {
  readonly uid: string;
  readonly store: Pick<IStore, 'alias'>;
  readonly createdAt: number;
  readonly updatedAt: number;
}
