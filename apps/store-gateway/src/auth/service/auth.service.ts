import {Injectable} from "@nestjs/common";
import {IAuthRepository} from "@store-apis/repositories/auth";
import {IUser, TCreateUser} from "@store-apis/domains/auth";
import {UserRecord} from "firebase-admin/lib/auth";

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {
  }

  async createUser(user: TCreateUser): Promise<UserRecord> {
    try {
      return this.authRepository.createUser(user)
    } catch (error: unknown) {
      console.error('Error in creating a user', error);
      throw error;
    }
  }
}
