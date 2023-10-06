import { IConfigurationRepository } from '../interface/configuration.repository.interface';
import { IStore } from '@store-apis/domains/shared';
import { Injectable } from '@nestjs/common';
import { IStoreMetaDbProvider } from 'libs/data-sources/src/lib/storemeta';

@Injectable()
export class ConfigurationRepository implements IConfigurationRepository {
  constructor(private readonly configurationProvider: IStoreMetaDbProvider) {}
  getStoreConfig(storeAlias: string): Promise<IStore> {
    return this.configurationProvider
      .collection<IStore>('configurations')
      .findOne({ alias: storeAlias });
  }
}
