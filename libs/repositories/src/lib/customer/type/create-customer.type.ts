import { ICustomer } from '@store-apis/domains/customer';

export type TCreateCustomer = Pick<ICustomer, 'phoneNumber'>;
