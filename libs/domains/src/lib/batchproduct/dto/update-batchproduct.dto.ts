import { CreateBatchProductDto } from './create-batchproduct.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class UpdateBatchProductDto extends CreateBatchProductDto {
  @IsString()
  readonly id: string;

  @IsNumber()
  readonly createdAt: number;

  @IsOptional()
  @IsNumber()
  readonly updatedAt: number;
}
