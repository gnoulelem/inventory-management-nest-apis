import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from '../../../service/sale.service';
import { AuthGuard } from '@store-apis/repositories/auth';
import { GCPLogging } from '@store-apis/repositories/shared';
import {
  CreateSaleDto,
  ISale,
  ISaleHistory,
  TCreateSale,
} from '@store-apis/domains/sale';
import { RealIP } from 'nestjs-real-ip';
import { v4 as uuidV4 } from 'uuid';
import { InsertOneResult } from 'mongodb';

@Controller('v1/sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @GCPLogging
  async createSale(
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

  @Get('')
  @UseGuards(AuthGuard)
  @GCPLogging
  async getSalePerDay(
    @Request() _request: Request,
    @Query('store') store: string,
    @Query('date') date: string
  ): Promise<ISale[]> {
    return this.saleService.getSalePerDate(store, date);
  }

  @Get('history')
  @UseGuards(AuthGuard)
  @GCPLogging
  async getSalesHistory(
    @Request() _request: Request,
    @Query('store') store: string,
    @Query('skipValue', ParseIntPipe) skipValue: number
  ): Promise<ISale[]> {
    return this.saleService.getSalesHistory(store, skipValue);
  }
}
