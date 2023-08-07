import { Module } from '@nestjs/common';
import { BatchProductRepositoryModule } from '@store-apis/repositories/batchproduct';
import { BatchProductService } from './service/batchproduct.service';
import { BatchProductController } from './api/v1/controller/batchproduct.controller';
import { AuthRepositoryModule } from '@store-apis/repositories/auth';

@Module({
  imports: [BatchProductRepositoryModule, AuthRepositoryModule],
  providers: [BatchProductService],
  controllers: [BatchProductController],
})
export class BatchProductModule {}
