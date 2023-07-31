import { Injectable } from '@nestjs/common';
import {
  ICustomerRepository,
  TCreateCustomer,
} from '@store-apis/repositories/customer';
import { auth } from 'firebase-admin';
import UserRecord = auth.UserRecord;

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async createCustomer({ phoneNumber }: TCreateCustomer): Promise<UserRecord> {
    return this.customerRepository.createCustomer({ phoneNumber });
  }
}
