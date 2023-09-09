import { Collection } from 'mongodb';
import { IEmployee } from '@store-apis/domains/employee';

export abstract class IEmployeeDbProvider extends Collection<IEmployee> {}
