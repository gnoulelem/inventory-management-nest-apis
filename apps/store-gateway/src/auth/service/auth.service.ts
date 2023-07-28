import { Injectable } from '@nestjs/common';
import { IAuthRepository } from '@store-apis/repositories/auth';
import { TCreateUser } from '@store-apis/repositories/auth';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async signUp({ phoneNumber }: TCreateUser): Promise<UserRecord> {
    return this.authRepository.createUser({ phoneNumber });
  }
}
