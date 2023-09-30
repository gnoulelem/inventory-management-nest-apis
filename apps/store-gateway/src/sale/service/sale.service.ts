import { Injectable } from '@nestjs/common';
import { ISaleRepository } from '@store-apis/repositories/sale';
import { ISale, ISaleItem, TCreateSale } from '@store-apis/domains/sale';
import { InsertOneResult } from 'mongodb';
import { ISaleAwsTopicProvider } from '../provider/saleawstopic.provider';
import * as process from 'process';
import { PublishCommand } from '@aws-sdk/client-sns';
import { IBatchProductRepository } from '@store-apis/repositories/batchproduct';

@Injectable()
export class SaleService {
  constructor(
    private readonly saleRepository: ISaleRepository,
    private readonly salesAwsTopicProvider: ISaleAwsTopicProvider,
    private readonly batchProductRepository: IBatchProductRepository
  ) {}

  async createSale(
    entityLike: TCreateSale & {
      readonly id: string;
      readonly createdAt: number;
    }
  ): Promise<InsertOneResult<ISale>> {
    try {
      const [createResult] = await Promise.all([
        this.saleRepository.create(entityLike),
        this.publishSale(entityLike),
        this.addSaleIdToBatchProductItems(entityLike as ISale),
      ]);
      return createResult;
    } catch (error: unknown) {
      console.error('Error in creating a Sale', error);
      throw error;
    }
  }

  async getSale(storeAlias: string, date: string): Promise<ISale[]> {
    try {
      return this.saleRepository.retrieve(storeAlias, date);
    } catch (error: unknown) {
      console.error('Error in retrieving Sales', error);
      throw error;
    }
  }

  private async publishSale(entityLike: TCreateSale): Promise<void> {
    try {
      if (entityLike.insider) {
        const input = {
          TopicArn: process.env.SALE_AWS_TOPIC_ARN,
          Message: JSON.stringify(entityLike),
        };
        const command = new PublishCommand(input);
        await this.salesAwsTopicProvider.send(command);
      }
    } catch (error: unknown) {
      console.error('Error in publishing a Sale', error);
      throw error;
    }
  }

  private async addSaleIdToBatchProductItems(sale: ISale): Promise<void> {
    try {
      await Promise.all(
        sale.items.map((item: ISaleItem) =>
          this.batchProductRepository.addSaleIdToItem({
            store: { alias: sale.store.alias },
            batchProductId: item.batchProductId,
            batchProductItemId: item.batchProductItemId,
            saleId: sale.id,
          })
        )
      );
    } catch (error: unknown) {
      console.error(
        `Error in adding SaleId to BatchProductItems for sale ${sale.id}`,
        error
      );
      throw error;
    }
  }
}
