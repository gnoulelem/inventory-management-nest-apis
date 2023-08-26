import { IBatchProductRepository } from '@store-apis/repositories/batchproduct';
import {
  IBatchProduct,
  TCreateBatchProduct,
  TDeleteBatchProduct,
  TUpdateBatchProduct,
} from '@store-apis/domains/batchproduct';
import { Injectable } from '@nestjs/common';
import { ModifyResult } from 'mongodb';

@Injectable()
export class BatchProductService {
  constructor(
    private readonly batchProductRepository: IBatchProductRepository
  ) {}

  async createBatchProduct(entityLike: TCreateBatchProduct): Promise<void> {
    try {
      await this.batchProductRepository.create(entityLike);
    } catch (error: unknown) {
      console.error('Error in creating a BatchProduct', error);
      throw error;
    }
  }

  async updateBatchProduct(
    entityLike: TUpdateBatchProduct
  ): Promise<ModifyResult<IBatchProduct>> {
    try {
      return this.batchProductRepository.update(entityLike);
    } catch (error: unknown) {
      console.error('Error in updating a BatchProduct', error);
      throw error;
    }
  }

  async deleteBatchProduct(
    entityLike: TDeleteBatchProduct
  ): Promise<ModifyResult<IBatchProduct>> {
    try {
      return this.batchProductRepository.delete(entityLike);
    } catch (error: unknown) {
      console.error('Error in deleting a BatchProduct', error);
      throw error;
    }
  }

  async findAvailableBatchProduct(
    storeAlias: string,
    skipValue: number
  ): Promise<IBatchProduct[]> {
    try {
      return this.batchProductRepository.findAvailable(storeAlias, skipValue);
    } catch (error: unknown) {
      console.error('Error in finding a BatchProduct', error);
      throw error;
    }
  }

  async searchAvailableBatchProduct(
    storeAlias: string,
    term: string
  ): Promise<IBatchProduct[]> {
    try {
      return this.batchProductRepository.searchAvailable(storeAlias, term);
    } catch (error: unknown) {
      console.error('Error in updating a BatchProduct', error);
      throw error;
    }
  }
}
