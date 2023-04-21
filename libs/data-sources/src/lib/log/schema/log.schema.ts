import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { ILog } from '@store-apis/domains/log';

export type LogDocument = HydratedDocument<Log>;

@Schema({
  collection: 'activity-logs',
  autoCreate: true,
  versionKey: false,
  timestamps: true,
})
export class Log implements ILog {
  @Prop({ required: true })
  id: string;
}

export const LogSchema = SchemaFactory.createForClass(Log);
