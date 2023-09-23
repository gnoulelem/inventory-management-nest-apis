import {
  IBill,
  IInsider,
  ISaleItem,
  ISaleMetadata,
} from '../interface/sale.interface';
import { TCreateSale } from '../type/create-sale.type';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsISO4217CurrencyCode,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsTimeZone,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IProduct,
  IStoreKeeper,
} from '../../batchproduct/interface/batchproduct.interface';
import { IStore } from '../../shared/interface/store.interface';

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

abstract class ItemDto implements ISaleItem {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ProductDto)
  readonly product: IProduct;

  @IsString()
  readonly batchProductId: string;

  @IsString()
  readonly batchProductItemId: string;
}

abstract class BillDto implements IBill {
  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly discount: number;
}

abstract class InsiderDto implements IInsider {
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

abstract class SaleMetadataDto implements ISaleMetadata {
  @IsString()
  readonly deviceLanguage: string;

  @IsString()
  readonly deviceOs: string;

  @IsOptional()
  readonly ipAddress: string;

  @IsString()
  readonly osVersion: string;

  @IsTimeZone()
  readonly timeZone: string;
}

abstract class StoreDto implements Pick<IStore, 'alias'> {
  @IsString()
  readonly alias: string;
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

export abstract class CreateSaleDto implements TCreateSale {
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ItemDto)
  readonly items: ISaleItem[];

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BillDto)
  readonly bill: IBill;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InsiderDto)
  readonly insider: IInsider;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SaleMetadataDto)
  readonly meta: ISaleMetadata;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreDto)
  readonly store: Pick<IStore, 'alias'>;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreKeeperDto)
  readonly storeKeeper: IStoreKeeper;
}
