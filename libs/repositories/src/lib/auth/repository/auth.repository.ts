import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '../interface/auth.repository.interface';
import { FirebaseAdminAuth } from '@store-apis/data-sources/auth';
import { auth } from 'firebase-admin';
import {TCreateUser} from "@store-apis/domains/auth";
import UserRecord = auth.UserRecord;
import DecodedIdToken = auth.DecodedIdToken;

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private readonly adminAuth: FirebaseAdminAuth) {}

  async decodeIdToken(idToken: string): Promise<DecodedIdToken> {
    return this.adminAuth.verifyIdToken(idToken);
  }

  async generateCustomToken(uid: string): Promise<void> {
    await this.adminAuth.setCustomUserClaims(uid, {
      permissions: {
        CreateUser: true,
      },
    });
  }

  async createUser(user: TCreateUser): Promise<UserRecord> {
    return this.adminAuth.createUser(user)
  }
}
