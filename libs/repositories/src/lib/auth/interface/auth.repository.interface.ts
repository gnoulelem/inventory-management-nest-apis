import { auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;

export abstract class IAuthRepository {
  abstract decodeIdToken(idToken: string): Promise<DecodedIdToken>;

  abstract generateCustomToken(uid: string): Promise<void>;
}
