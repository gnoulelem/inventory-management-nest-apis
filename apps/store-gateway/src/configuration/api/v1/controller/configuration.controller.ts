import { Controller, Get, Param, Request } from '@nestjs/common';
import { IStore } from '@store-apis/domains/shared';
import { ConfigurationService } from '../../../service/configuration.service';
import { GCPLogging } from '@store-apis/repositories/shared';

@Controller('v1/storemeta/configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('/:storeAlias')
  @GCPLogging
  async getStoreConfig(
    @Request() _request: Request,
    @Param('storeAlias') storeAlias: string
  ): Promise<IStore> {
    return this.configurationService.getStoreConfig(storeAlias);
  }
}
