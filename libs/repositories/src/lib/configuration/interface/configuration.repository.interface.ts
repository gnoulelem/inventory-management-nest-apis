import { IStore } from '@store-apis/domains/shared';

export abstract class IConfigurationRepository {
  abstract getStoreConfig(storeAlias: string): Promise<IStore>;
}
