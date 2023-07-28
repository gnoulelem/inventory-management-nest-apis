import { IUser } from '@store-apis/domains/auth';

export type TCreateUser = Pick<IUser, 'phoneNumber'>;
