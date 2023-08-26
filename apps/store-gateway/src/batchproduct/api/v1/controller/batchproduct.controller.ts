import {
  Body,
  Controller,
  Ip,
  Post,
  Put,
  Get,
  Delete,
  Query,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
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
import { ModifyResult } from 'mongodb';
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
    @Body() createBatchProductBody: CreateBatchProductDto,
    @Ip() ipAddress: string
  ): Promise<void> {
    const batchProduct: TCreateBatchProduct & {
      createdAt: number;
      updatedAt: number;
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
    await this.batchProductService.createBatchProduct(batchProduct);
  }

  @Put('/')
  @UseGuards(AuthGuard)
  @GCPLogging
  async update(
    @Body() updateBatchProductBody: UpdateBatchProductDto,
    @Ip() ipAddress: string
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
    @Body() deleteBatchProductBody: DeleteBatchProductDto,
    @Ip() ipAddress: string
  ): Promise<ModifyResult<IBatchProduct>> {
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
    return this.batchProductService.deleteBatchProduct(batchProduct);
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

  @Get('/search')
  @UseGuards(AuthGuard)
  @GCPLogging
  async searchAvailable(
    @Request() _request: Request,
    @Query('store') store: string,
    @Query('query') query: string
  ): Promise<IBatchProduct[]> {
    return this.batchProductService.searchAvailableBatchProduct(store, query);
  }
}
