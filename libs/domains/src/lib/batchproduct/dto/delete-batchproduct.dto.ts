import { UpdateBatchProductDto } from './update-batchproduct.dto';
import { IsNumber } from 'class-validator';
import { IDeletion } from '../interface/batchproduct.interface';

export abstract class DeletionDto implements IDeletion {
  @IsNumber()
  deletedAt: number;
}

export abstract class DeleteBatchProductDto extends UpdateBatchProductDto {}
