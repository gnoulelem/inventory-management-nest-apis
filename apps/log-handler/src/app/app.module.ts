import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LogRepositoryModule } from '@store-apis/repositories/log';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LogRepositoryModule,
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
