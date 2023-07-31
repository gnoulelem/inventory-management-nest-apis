import { ICustomerRepository } from '../interface/customer.repository.interface';
import { TCreateCustomer } from '../type/create-customer.type';
import { auth } from 'firebase-admin';
import { FirebaseAdminAuth } from '@store-apis/data-sources/customer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly adminAuth: FirebaseAdminAuth) {}
  createCustomer(entityLike: TCreateCustomer): Promise<auth.UserRecord> {
    return this.adminAuth.createUser({
      phoneNumber: entityLike.phoneNumber,
    });
  }
}
