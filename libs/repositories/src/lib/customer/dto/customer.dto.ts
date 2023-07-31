import { IsString } from 'class-validator';
import { TCreateCustomer } from '../type/create-customer.type';

export abstract class CreateCustomerDto implements TCreateCustomer {
  @IsString()
  phoneNumber: string;
}
