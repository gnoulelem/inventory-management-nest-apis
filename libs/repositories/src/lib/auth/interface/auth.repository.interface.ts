import { auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;
import {IUser, TCreateUser} from "@store-apis/domains/auth";
import UserRecord = auth.UserRecord;

export abstract class IAuthRepository {
  abstract decodeIdToken(idToken: string): Promise<DecodedIdToken>;

  abstract generateCustomToken(uid: string): Promise<void>;

  abstract createUser(user: TCreateUser): Promise<UserRecord>
}
