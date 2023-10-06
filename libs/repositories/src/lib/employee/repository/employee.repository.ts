import { IEmployeeRepository } from '../interface/employee.repository.interface';
import { IEmployee } from '@store-apis/domains/employee';
import { IStoreMetaDbProvider } from 'libs/data-sources/src/lib/storemeta';
import { WithId } from 'mongodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(private readonly employeeProvider: IStoreMetaDbProvider) {}

  getMe(uid: string): Promise<WithId<IEmployee>> {
    return this.employeeProvider
      .collection<IEmployee>('employees')
      .findOne({ uid: uid });
  }
}
