import { Module } from '@nestjs/common';
import { CustomerController } from './api/v1/controller/customer.controller';
import { CustomerService } from './service/customer.service';
import { CustomerRepositoryModule } from '@store-apis/repositories/customer';
import { AuthRepositoryModule } from '@store-apis/repositories/auth';

@Module({
  imports: [CustomerRepositoryModule, AuthRepositoryModule],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
