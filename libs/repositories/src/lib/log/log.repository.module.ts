import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  Log,
  LogSchema,
  LogDataSourceModule,
} from '@store-apis/data-sources/log';

import { ILogRepository } from './interface/log.repository.interface';
import { LogRepository } from './repository/log.repository';

@Module({
  providers: [
    {
      provide: ILogRepository,
      useClass: LogRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    LogDataSourceModule,
  ],
  exports: [ILogRepository],
})
export class LogRepositoryModule {}
