import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { AuthModule } from './auth';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
