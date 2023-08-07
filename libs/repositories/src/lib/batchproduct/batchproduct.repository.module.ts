import { Module } from '@nestjs/common';
import { BatchProductDataSourceModule } from '@store-apis/data-sources/batchproduct';
import { IBatchProductRepository } from './interface/batchproduct.repository.interface';
import { BatchProductRepository } from './repository/batchproduct.repository';

@Module({
  imports: [BatchProductDataSourceModule.forFeatureAsync()],
  providers: [
    {
      provide: IBatchProductRepository,
      useClass: BatchProductRepository,
    },
  ],
  exports: [IBatchProductRepository],
})
export class BatchProductRepositoryModule {}
