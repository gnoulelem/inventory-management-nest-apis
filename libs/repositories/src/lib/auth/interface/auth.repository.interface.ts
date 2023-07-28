import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;
import { TCreateUser } from '../type/create-user.type';

export abstract class IAuthRepository {
  abstract createUser(entityLike: TCreateUser): Promise<UserRecord>;
}
