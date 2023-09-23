import { Module } from '@nestjs/common';
import { SaleRepositoryModule } from '@store-apis/repositories/sale';
import { AuthRepositoryModule } from '@store-apis/repositories/auth';
import { SaleService } from './service/sale.service';
import { SaleController } from './api/v1/controller/sale.controller';

@Module({
  imports: [SaleRepositoryModule, AuthRepositoryModule],
  providers: [SaleService],
  controllers: [SaleController],
})
export class SaleModule {}
