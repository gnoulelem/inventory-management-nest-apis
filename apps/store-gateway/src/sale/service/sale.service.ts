import { Injectable } from '@nestjs/common';
import { ISaleRepository } from '@store-apis/repositories/sale';
import { ISale, TCreateSale } from '@store-apis/domains/sale';
import { InsertOneResult } from 'mongodb';
import { ISaleAwsTopicProvider } from '../provider/saleawstopic.provider';
import * as process from 'process';
import { PublishCommand } from '@aws-sdk/client-sns';

@Injectable()
export class SaleService {
  constructor(
    private readonly saleRepository: ISaleRepository,
    private readonly salesAwsTopicProvider: ISaleAwsTopicProvider
  ) {}

  async createSale(entityLike: TCreateSale): Promise<InsertOneResult<ISale>> {
    try {
      const [createResult] = await Promise.all([
        this.saleRepository.create(entityLike),
        this.publishSale(entityLike),
      ]);
      return createResult;
    } catch (error: unknown) {
      console.error('Error in creating a Sale', error);
      throw error;
    }
  }

  private async publishSale(entityLike: TCreateSale): Promise<void> {
    try {
      const input = {
        TopicArn: process.env.SALE_AWS_TOPIC_ARN,
        Message: JSON.stringify(entityLike),
      };
      const command = new PublishCommand(input);
      await this.salesAwsTopicProvider.send(command);
    } catch (error: unknown) {
      console.error('Error in publishing a Sale', error);
      throw error;
    }
  }
}
