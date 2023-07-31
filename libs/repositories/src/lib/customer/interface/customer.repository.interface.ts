import { TCreateCustomer } from '../type/create-customer.type';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

export abstract class ICustomerRepository {
  abstract createCustomer(entityLike: TCreateCustomer): Promise<UserRecord>;
}
