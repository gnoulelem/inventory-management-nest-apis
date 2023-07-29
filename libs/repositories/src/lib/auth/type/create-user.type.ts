import { IUser } from '@store-apis/domains/auth';

export type TCreateUser = Pick<IUser, 'phoneNumber'>;

export type TGetToken = Pick<IUser, 'uid'>;
