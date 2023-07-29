import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;
import { TCreateUser } from '../type/create-user.type';
import DecodedIdToken = auth.DecodedIdToken;

export abstract class IAuthRepository {
  abstract createUser(entityLike: TCreateUser): Promise<UserRecord>;

  abstract decodeIdToken(idToken: string): Promise<DecodedIdToken>;

  abstract generateCustomToken(uid: string): Promise<void>;
}
