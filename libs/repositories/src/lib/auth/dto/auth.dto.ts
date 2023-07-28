import { IsString } from 'class-validator';
import { TCreateUser } from '../type/create-user.type';

export abstract class CreateUserDto implements TCreateUser {
  @IsString()
  phoneNumber: string;
}
