import { TCreateLog } from '../type/create-log.type';

export abstract class ILogRepository {
  abstract create(entityLike: TCreateLog): Promise<void>;
}
