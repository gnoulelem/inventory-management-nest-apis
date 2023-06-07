import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { ILog, ILogAgent, ILogMetada } from '@store-apis/domains/log';

export type LogDocument = HydratedDocument<Log>;

@Schema({
  _id: false,
  versionKey: false,
})
class LogMetadata implements ILogMetada {
  @Prop({ required: true })
  time: number;
}

@Schema({
  _id: false,
  versionKey: false,
})
class LogAgent implements ILogAgent {
  @Prop({ required: true })
  ipAddress: string;

  @Prop({ required: true })
  osType: string;

  @Prop({ required: true })
  osVersion: string;

  @Prop({ required: true })
  timeZone: string;

  @Prop({ required: true })
  browser: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  location: string;
}

@Schema({
  collection: 'logs',
  autoCreate: true,
  versionKey: false,
  timestamps: true,
})
export class Log implements ILog {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  entityId: string;

  @Prop({ required: true })
  activity: string;

  @Prop({ required: true, type: LogMetadata })
  metadata: ILogMetada;

  @Prop({ required: true, type: LogAgent })
  agent: ILogAgent;
}

export const LogSchema = SchemaFactory.createForClass(Log);
