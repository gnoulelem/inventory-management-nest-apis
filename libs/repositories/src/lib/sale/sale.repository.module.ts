import { Module } from '@nestjs/common';
import { SaleDataSourceModule } from '@store-apis/data-sources/sale';
import { ISaleRepository } from './interface/sale.repository.interface';
import { SaleRepository } from './repository/sale.repository';

@Module({
  imports: [SaleDataSourceModule.forFeatureAsync()],
  providers: [
    {
      provide: ISaleRepository,
      useClass: SaleRepository,
    },
  ],
  exports: [ISaleRepository],
})
export class SaleRepositoryModule {}
