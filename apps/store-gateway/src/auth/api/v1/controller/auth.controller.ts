import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from '../../../service/auth.service';
import {
  AuthGuard,
  PermissionsGuard,
  CreateUserDto,
  EPermission,
  GetTokenDto,
  Permissions,
} from '@store-apis/repositories/auth';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @Permissions(EPermission.CreateUser)
  @UseGuards(AuthGuard, PermissionsGuard)
  async signUp(@Body() { phoneNumber }: CreateUserDto): Promise<UserRecord> {
    try {
      return this.authService.signUp({ phoneNumber });
    } catch (e) {
      console.error(e);
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/token/:uid')
  @Permissions(EPermission.AddPermission)
  @UseGuards(AuthGuard, PermissionsGuard)
  async getToken(@Param() { uid }: GetTokenDto): Promise<void> {
    try {
      await this.authService.getToken({ uid });
    } catch {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
