import { Module } from '@nestjs/common';
import { LogDomainModule } from './log/log.domain.module';
import { AuthDomainModule } from './auth/auth.domain.module';

@Module({
  providers: [],
  exports: [],
  imports: [LogDomainModule, AuthDomainModule]
})
export class DomainsModule {}
