import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../interface/auth.repository.interface';
import { FirebaseAdminAuth } from '@store-apis/data-sources/auth';
import { TCreateUser } from '../type/create-user.type';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly adminAuth: FirebaseAdminAuth) {}

  async createUser(entityLike: TCreateUser): Promise<UserRecord> {
    return this.adminAuth.createUser({
      phoneNumber: entityLike.phoneNumber,
    });
  }
}
