import {
  Body,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { v4 as uuidV4 } from 'uuid';
import {
  CreateBatchProductDto,
  IBatchProduct,
  TCreateBatchProduct,
  TDeleteBatchProduct,
  TUpdateBatchProduct,
  UpdateBatchProductDto,
} from '@store-apis/domains/batchproduct';
import { BatchProductService } from '../../../service/batchproduct.service';
import { ModifyResult, InsertOneResult } from 'mongodb';
import { AuthGuard } from '@store-apis/repositories/auth';
import { DeleteBatchProductDto } from '@store-apis/domains/batchproduct';
import { GCPLogging } from '@store-apis/repositories/shared';

@Controller('v1/batchproduct')
export class BatchProductController {
  constructor(private readonly batchProductService: BatchProductService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  @GCPLogging
  async store(
    @Request() _request: Request,
    @Body() createBatchProductBody: CreateBatchProductDto,
    @RealIP() ipAddress: string
  ): Promise<InsertOneResult<IBatchProduct>> {
    const batchProduct: TCreateBatchProduct & {
      readonly createdAt: number;
      readonly updatedAt: number;
    } = {
      id: uuidV4(),
      ...createBatchProductBody,
      meta: {
        ...createBatchProductBody.meta,
        ipAddress,
      },
      items: [...Array(createBatchProductBody.batch.size).keys()].map(() => ({
        itemId: uuidV4(),
      })),
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };
    return await this.batchProductService.createBatchProduct(batchProduct);
  }

  @Put('/')
  @UseGuards(AuthGuard)
  @GCPLogging
  async update(
    @Request() _request: Request,
    @Body() updateBatchProductBody: UpdateBatchProductDto,
    @RealIP() ipAddress: string
  ): Promise<ModifyResult<IBatchProduct>> {
    const batchProduct: TUpdateBatchProduct = {
      ...updateBatchProductBody,
      meta: {
        ...updateBatchProductBody.meta,
        ipAddress,
      },
      updatedAt: Date.now(),
    };
    return this.batchProductService.updateBatchProduct(batchProduct);
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  @GCPLogging
  async delete(
    @Request() _request: Request,
    @Body() deleteBatchProductBody: DeleteBatchProductDto,
    @RealIP() ipAddress: string
  ): Promise<{ id: string }> {
    const batchProduct: TDeleteBatchProduct = {
      ...deleteBatchProductBody,
      meta: {
        ...deleteBatchProductBody.meta,
        ipAddress,
      },
      updatedAt: Date.now(),
      deletion: {
        deletedAt: Date.now(),
      },
    };
    delete batchProduct['_id'];
    await this.batchProductService.deleteBatchProduct(batchProduct);
    return {
      id: deleteBatchProductBody.id,
    };
  }

  @Get('/available')
  @UseGuards(AuthGuard)
  @GCPLogging
  async showAvailable(
    @Request() _request: Request,
    @Query('store') store: string,
    @Query('skipValue', ParseIntPipe) skipValue: number
  ): Promise<IBatchProduct[]> {
    return this.batchProductService.findAvailableBatchProduct(store, skipValue);
  }

  @Get('/available/search')
  @UseGuards(AuthGuard)
  @GCPLogging
  async searchAvailable(
    @Request() _request: Request,
    @Query('store') store: string,
    @Query('query') query: string
  ): Promise<IBatchProduct[]> {
    return this.batchProductService.searchAvailableBatchProduct(store, query);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @GCPLogging
  async show(
    @Request() _request: Request,
    @Query('store') store: string,
    @Query('skipValue', ParseIntPipe) skipValue: number
  ): Promise<IBatchProduct[]> {
    return this.batchProductService.findBatchProduct(store, skipValue);
  }

  @Get('/search')
  @UseGuards(AuthGuard)
  @GCPLogging
  async search(
    @Request() _request: Request,
    @Query('store') store: string,
    @Query('query') query: string
  ): Promise<IBatchProduct[]> {
    return this.batchProductService.searchBatchProduct(store, query);
  }
}
