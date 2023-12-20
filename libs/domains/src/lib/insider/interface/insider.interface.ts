export interface IInsider {
  readonly uid: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly phoneNumber: string;
  readonly password: string;
  readonly displayName: string;
  readonly photoURL: string;
  readonly disabled: boolean;
}
