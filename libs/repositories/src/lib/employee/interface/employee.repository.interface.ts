import { IEmployee } from '@store-apis/domains/employee';

export abstract class IEmployeeRepository {
  abstract getMe(uid: string): Promise<IEmployee>;
}
