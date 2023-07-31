import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from '../../../service/customer.service';
import {
  AuthGuard,
  PermissionsGuard,
  EPermission,
  Permissions,
} from '@store-apis/repositories/auth';
import { CreateCustomerDto } from '@store-apis/repositories/auth';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

@Controller('v1/customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/')
  @Permissions(EPermission.CreateUser)
  @UseGuards(AuthGuard, PermissionsGuard)
  async signUp(
    @Body() { phoneNumber }: CreateCustomerDto
  ): Promise<UserRecord> {
    try {
      return this.customerService.createCustomer({ phoneNumber });
    } catch (e) {
      console.error(e);
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
