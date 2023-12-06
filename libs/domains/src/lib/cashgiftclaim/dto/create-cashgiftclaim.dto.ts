import {IBill, IMetadata, TCreateCashgiftclaim} from "@store-apis/domains/cashgiftclaim";
import {IStore} from "@store-apis/domains/shared";
import {IStoreKeeper} from "@store-apis/domains/batchproduct";
import {
  IsBoolean,
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsTimeZone,
  ValidateNested
} from "class-validator";
import {Type} from "class-transformer";
import {IInsider} from "@store-apis/domains/sale";

export abstract class CreateCashgiftclaimDto implements TCreateCashgiftclaim {
  @IsOptional()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => InsiderDto)
  readonly insider: IInsider;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SaleMetadataDto)
  readonly meta: IMetadata;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => SaleBillDto)
  readonly saleBill: IBill;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreDto)
  readonly store: Pick<IStore, "alias">;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreKeeperDto)
  readonly storeKeeper: IStoreKeeper;

}

abstract class SaleMetadataDto implements IMetadata {
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

abstract class SaleBillDto implements IBill {
  @IsNumber()
  readonly amount: number;
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
