import { IUser } from '../interface/auth.interface';

export class User implements IUser {
  readonly disabled: boolean;
  readonly displayName: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly password: string;
  readonly phoneNumber: string;
  readonly photoURL: string;
  readonly uid: string;
}
