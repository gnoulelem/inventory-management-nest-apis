import { Module } from '@nestjs/common';
import { ConfigurationRepositoryModule } from '@store-apis/repositories/configuration';
import { ConfigurationService } from './service/configuration.service';
import { ConfigurationController } from './api/v1/controller/configuration.controller';

@Module({
  imports: [ConfigurationRepositoryModule],
  providers: [ConfigurationService],
  controllers: [ConfigurationController],
})
export class ConfigurationModule {}
