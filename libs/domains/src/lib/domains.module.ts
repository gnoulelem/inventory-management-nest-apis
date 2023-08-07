import { Module } from '@nestjs/common';
import { LogDomainModule } from './log/log.domain.module';
import { AuthDomainModule } from './auth/auth.domain.module';
import { BatchProductDomainModule } from './batchproduct/batchproduct.domain.module';
import { CustomerDomainModule } from './customer/customer.domain.module';

@Module({
  providers: [],
  exports: [],
  imports: [
    LogDomainModule,
    AuthDomainModule,
    CustomerDomainModule,
    BatchProductDomainModule,
  ],
})
export class DomainsModule {}
