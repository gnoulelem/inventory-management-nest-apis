import { Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '@store-apis/repositories/employee';
import { IEmployee } from '@store-apis/domains/employee';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async getMe(uid: string): Promise<IEmployee> {
    return this.employeeRepository.getMe(uid);
  }
}
