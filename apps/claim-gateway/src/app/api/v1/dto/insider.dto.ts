import {IsString} from "class-validator";

export abstract class CreateInsiderDto  {
  @IsString()
  phoneNumber: string;
}
