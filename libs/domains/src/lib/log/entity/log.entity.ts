import { ILog } from '../interface/log.interface';

export class Log implements ILog {
  id: string;

  constructor(entityLike: ILog) {
    this.id = entityLike.id;
  }
}
