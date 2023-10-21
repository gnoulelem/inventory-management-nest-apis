import {TCreateUser} from "../type/create-user.type";
import {IsBoolean, IsOptional, IsString} from "class-validator";

export abstract class CreateUserDto implements TCreateUser {
  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsBoolean()
  readonly emailVerified: boolean;

  @IsOptional()
  @IsString()
  readonly phoneNumber: string;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly displayName: string;

  @IsOptional()
  @IsString()
  readonly photoURL: string;

  @IsOptional()
  @IsBoolean()
  readonly disabled: boolean;
}
