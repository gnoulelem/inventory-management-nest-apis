import { Module } from '@nestjs/common';
import { SaleRepositoryModule } from '@store-apis/repositories/sale';
import { AuthRepositoryModule } from '@store-apis/repositories/auth';
import { SNSClient } from '@aws-sdk/client-sns';
import { SaleService } from './service/sale.service';
import { SaleController } from './api/v1/controller/sale.controller';
import { ISaleAwsTopicProvider } from './provider/saleawstopic.provider';
import { BatchProductRepositoryModule } from '@store-apis/repositories/batchproduct';
import * as process from "process";

@Module({
  imports: [
    SaleRepositoryModule,
    AuthRepositoryModule,
    BatchProductRepositoryModule,
  ],
  providers: [
    SaleService,
    {
      provide: ISaleAwsTopicProvider,
      useFactory: () => new SNSClient({ region: process.env.AWS_REGION }),
    },
  ],
  controllers: [SaleController],
})
export class SaleModule {}
