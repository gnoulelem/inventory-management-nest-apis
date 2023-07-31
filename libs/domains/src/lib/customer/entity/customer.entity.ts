import { ICustomer } from '../interface/customer.interface';

export class Customer implements ICustomer {
  readonly disabled: boolean;
  readonly displayName: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly password: string;
  readonly phoneNumber: string;
  readonly photoURL: string;
  readonly uid: string;
}
