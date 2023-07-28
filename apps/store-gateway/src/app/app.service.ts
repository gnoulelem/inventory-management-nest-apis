import { Injectable } from '@nestjs/common';
import { ILog, Log } from '@store-apis/domains/log';

@Injectable()
export class AppService {
  getData(): { message: string } {
    const log: ILog = new Log({
      id: 'test-id',
      entityId: 'entity-id',
      activity: 'test-activity',
      metadata: {
        time: 11111111,
      },
      agent: {
        ipAddress: '',
        osType: '',
        osVersion: '',
        timeZone: '',
        browser: '',
        language: '',
        location: '',
      },
    });

    console.log(log);
    return { message: 'Hello API' };
  }
}
