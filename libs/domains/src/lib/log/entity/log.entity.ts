import { ILog, ILogMetadata, ILogAgent } from '../interface/log.interface';

export class Log implements ILog {
  id: string;
  entityId: string;
  activity: string;
  metadata: ILogMetadata;
  agent: ILogAgent;

  constructor(entityLike: ILog) {
    this.id = entityLike.id;
    this.entityId = entityLike.entityId;
    this.activity = entityLike.activity;
    this.metadata = entityLike.metadata;
    this.agent = entityLike.agent;
  }
}
