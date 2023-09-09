import { IEmployeeRepository } from '../interface/employee.repository.interface';
import { IEmployee } from '@store-apis/domains/employee';
import { IEmployeeDbProvider } from '@store-apis/data-sources/employee';
import { WithId } from 'mongodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(private readonly employeeProvider: IEmployeeDbProvider) {}

  getMe(uid: string): Promise<WithId<IEmployee>> {
    return this.employeeProvider.findOne({ uid: uid });
  }
}
