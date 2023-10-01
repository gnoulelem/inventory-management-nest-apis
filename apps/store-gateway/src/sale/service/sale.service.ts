import { Injectable } from '@nestjs/common';
import { ISaleRepository } from '@store-apis/repositories/sale';
import {
  ISale,
  ISaleHistory,
  ISaleItem,
  TCreateSale,
} from '@store-apis/domains/sale';
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

  async getSalePerDate(storeAlias: string, date: string): Promise<ISale[]> {
    try {
      return this.saleRepository.retrievePerDate(storeAlias, date);
    } catch (error: unknown) {
      console.error('Error in retrieving Sales', error);
      throw error;
    }
  }

  async getSalesHistory(
    storeAlias: string,
    date: string
  ): Promise<ISaleHistory> {
    const MIN_NUMBER_OF_SALES = 3;
    const allSalesCount = await this.saleRepository.countAllSales(storeAlias);
    if (allSalesCount >= MIN_NUMBER_OF_SALES) {
      let currentDate: string = date;
      const salesHistory = {
        [currentDate]: await this.saleRepository.retrievePerDate(
          storeAlias,
          date
        ),
      };
      while (this.getTotalLengthOfArrays(salesHistory) < MIN_NUMBER_OF_SALES) {
        currentDate = this.getDayBefore(currentDate);
        salesHistory[currentDate] = await this.saleRepository.retrievePerDate(
          storeAlias,
          currentDate
        );
      }
      return salesHistory;
    }
  }

  private getDayBefore(dateString: string): string {
    const dateParts = dateString.split('-');
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10);
      const day = parseInt(dateParts[2], 10);

      const currentDate = new Date(year, month - 1, day);
      currentDate.setDate(currentDate.getDate() - 1);

      const yearBefore = currentDate.getFullYear();
      const monthBefore = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const dayBefore = currentDate.getDate().toString().padStart(2, '0');

      return `${yearBefore}-${monthBefore}-${dayBefore}`;
    }
    return null; // Invalid date format
  }

  private getTotalLengthOfArrays(obj: ISaleHistory): number {
    const combinedArray = Object.values(obj).reduce(
      (accumulator, currentValue) => {
        return accumulator.concat(currentValue);
      },
      []
    );
    return combinedArray.length;
  }
}
