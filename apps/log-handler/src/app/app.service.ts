import { Injectable } from '@nestjs/common';
import { ILogRepository } from '@store-apis/repositories/log';

@Injectable()
export class AppService {
  constructor(private readonly logRepository: ILogRepository) {}

 
  getData(): { message: string } {
    //this.logRepository.create({ id: 'LogNewId' });
    return { message: 'Hello API' };
  }
}
