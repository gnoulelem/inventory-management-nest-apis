import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ILog } from '@store-apis/domains/log';
import { Log, LogDocument } from '@store-apis/data-sources/log';

import { ILogRepository } from '../interface/log.repository.interface';

@Injectable()
export class LogRepository implements ILogRepository {
  constructor(
    @InjectModel(Log.name) private readonly logModel: Model<LogDocument>
  ) {}

  async create(entityLike: ILog): Promise<void> {
    const log = new this.logModel(entityLike);
    await log.save();
  }
}
