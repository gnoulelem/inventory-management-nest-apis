import { Module } from '@nestjs/common';
import { LogDomainModule } from './log/log.domain.module';

@Module({
  providers: [],
  exports: [],
  imports: [LogDomainModule]
})
export class DomainsModule {}
