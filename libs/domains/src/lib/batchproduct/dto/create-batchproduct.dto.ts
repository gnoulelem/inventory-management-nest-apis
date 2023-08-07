import { TCreateBatchProduct } from '../type/create-batchproduct.type';
import {
  IBatch,
  IBatchProductMetadata,
  IProduct,
  IStore,
  IStoreKeeper,
} from '../interface/batchproduct.interface';
import {
  IsBoolean,
  IsDefined,
  IsIP,
  IsISO4217CurrencyCode,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsTimeZone,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

abstract class BatchDto implements IBatch {
  @IsOptional()
  @IsNumber()
  batchId: string;

  @IsNumber()
  size: number;
}

abstract class BatchProductMetadataDto implements IBatchProductMetadata {
  @IsString()
  readonly deviceLanguage: string;

  @IsString()
  readonly deviceOs: string;

  @IsOptional()
  @IsIP('4')
  readonly ipAddress: string;

  @IsString()
  readonly osVersion: string;

  @IsTimeZone()
  readonly timeZone: string;
}

abstract class ProductDto implements IProduct {
  @IsISO4217CurrencyCode()
  readonly currency: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  readonly unitPrice: string;
}

abstract class StoreKeeperDto implements IStoreKeeper {
  @IsOptional()
  @IsBoolean()
  readonly disabled: boolean;

  @IsOptional()
  @IsString()
  readonly displayName: string;

  @IsOptional()
  @IsString()
  readonly email: string;

  @IsOptional()
  @IsBoolean()
  readonly emailVerified: boolean;

  @IsOptional()
  @IsString()
  readonly password: string;

  @IsString()
  readonly phoneNumber: string;

  @IsOptional()
  @IsString()
  readonly photoURL: string;

  @IsString()
  readonly uid: string;
}

abstract class StoreDto implements IStore {
  @IsString()
  readonly alias: string;
}

export abstract class CreateBatchProductDto
  implements Omit<TCreateBatchProduct, 'id'>
{
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BatchDto)
  readonly batch: IBatch;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BatchProductMetadataDto)
  readonly meta: IBatchProductMetadata;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ProductDto)
  readonly product: IProduct;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreKeeperDto)
  readonly storeKeeper: IStoreKeeper;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreDto)
  readonly store: IStore;
}
