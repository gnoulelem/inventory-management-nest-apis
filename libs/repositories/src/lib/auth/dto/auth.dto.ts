import { IsString } from 'class-validator';
import { TCreateUser, TGetToken } from '../type/create-user.type';

export abstract class CreateUserDto implements TCreateUser {
  @IsString()
  phoneNumber: string;
}

export abstract class GetTokenDto implements TGetToken {
  @IsString()
  uid: string;
}
