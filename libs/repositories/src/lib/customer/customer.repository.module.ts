import { Module } from '@nestjs/common';
import { CustomerDataSourceModule } from '@store-apis/data-sources/customer';
import { ICustomerRepository } from './interface/customer.repository.interface';
import { CustomerRepository } from './repository/customer.repository';

@Module({
  imports: [CustomerDataSourceModule.register()],
  providers: [
    {
      provide: ICustomerRepository,
      useClass: CustomerRepository,
    },
  ],
  exports: [ICustomerRepository],
})
export class CustomerRepositoryModule {}
