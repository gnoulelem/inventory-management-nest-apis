import { IEmployee } from '../interface/employee.interface';
import { IStore } from '../../shared/interface/store.interface';

export class Employee implements IEmployee {
  readonly uid: string;
  readonly store: Pick<IStore, 'alias'>;
  readonly createdAt: number;
  readonly updatedAt: number;

  constructor(entityLike: IEmployee) {
    this.uid = entityLike.uid;
    this.store = entityLike.store;
    this.createdAt = entityLike.createdAt;
    this.updatedAt = entityLike.updatedAt;
  }

  static create(entityLike: IEmployee): IEmployee {
    return new Employee(entityLike);
  }
}
