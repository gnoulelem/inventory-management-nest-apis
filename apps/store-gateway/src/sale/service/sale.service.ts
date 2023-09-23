import { Injectable } from '@nestjs/common';
import { ISaleRepository } from '@store-apis/repositories/sale';
import { ISale, TCreateSale } from '@store-apis/domains/sale';
import { InsertOneResult } from 'mongodb';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: ISaleRepository) {}

  async createSale(entityLike: TCreateSale): Promise<InsertOneResult<ISale>> {
    try {
      return this.saleRepository.create(entityLike);
    } catch (error: unknown) {
      console.error('Error in creating a Sale', error);
      throw error;
    }
  }
}
