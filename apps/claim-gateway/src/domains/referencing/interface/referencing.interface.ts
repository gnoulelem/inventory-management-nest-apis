export interface IReferencing {
  readonly _id: string | undefined;
  readonly id: string;
  readonly insider: IInsider;
  readonly referrer: IReferrer
  readonly createdAt: number;
}

interface IReferrer {
  readonly kind: 'insider' | 'store',
  readonly id: string,
}

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
