import { Module } from '@nestjs/common';
import { IConfigurationRepository } from './interface/configuration.repository.interface';
import { ConfigurationRepository } from './repository/configuration.repository';
import { StoreMetaDataSourceModule } from 'libs/data-sources/src/lib/storemeta';

@Module({
  imports: [StoreMetaDataSourceModule.forFeatureAsync()],
  providers: [
    {
      provide: IConfigurationRepository,
      useClass: ConfigurationRepository,
    },
  ],
  exports: [IConfigurationRepository],
})
export class ConfigurationRepositoryModule {}
