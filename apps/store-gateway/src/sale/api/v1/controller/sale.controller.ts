import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { SaleService } from '../../../service/sale.service';
import { AuthGuard } from '@store-apis/repositories/auth';
import { GCPLogging } from '@store-apis/repositories/shared';
import { CreateSaleDto, ISale, TCreateSale } from '@store-apis/domains/sale';
import { RealIP } from 'nestjs-real-ip';
import { v4 as uuidV4 } from 'uuid';
import { InsertOneResult } from 'mongodb';

@Controller('v1/sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @GCPLogging
  async sale_store(
    @Request() _request: Request,
    @Body() createSaleBody: CreateSaleDto,
    @RealIP() ipAddress: string
  ): Promise<InsertOneResult<ISale>> {
    const sale: TCreateSale & {
      readonly id: string;
      readonly createdAt: number;
    } = {
      ...createSaleBody,
      id: uuidV4(),
      meta: {
        ...createSaleBody.meta,
        ipAddress,
      },
      createdAt: Date.now(),
    };
    return await this.saleService.createSale(sale);
  }
}
