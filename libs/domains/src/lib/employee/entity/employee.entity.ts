import { IEmployee } from '../interface/employee.interface';
import { IStore } from '../../batchproduct/interface/batchproduct.interface';

export class Employee implements IEmployee {
  readonly uid: string;
  readonly store: IStore;
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
