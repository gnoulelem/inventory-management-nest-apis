import { Injectable } from '@nestjs/common';
import { IConfigurationRepository } from '@store-apis/repositories/configuration';
import { IStore } from '@store-apis/domains/shared';

@Injectable()
export class ConfigurationService {
  constructor(
    private readonly configurationRepository: IConfigurationRepository
  ) {}

  async getStoreConfig(storeAlias: string): Promise<IStore> {
    try {
      return this.configurationRepository.getStoreConfig(storeAlias);
    } catch (error: unknown) {
      console.error('Error in getting a Store config', error);
      throw error;
    }
  }
}
