import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../../service/auth.service';
import { CreateUserDto } from '@store-apis/repositories/auth';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() { phoneNumber }: CreateUserDto): Promise<UserRecord> {
    try {
      return this.authService.signUp({ phoneNumber });
    } catch (e) {
      console.error(e);
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
