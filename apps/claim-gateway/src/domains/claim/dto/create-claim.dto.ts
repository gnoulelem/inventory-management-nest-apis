import {IMetadata} from "@store-apis/domains/cashgiftclaim";
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
import {TCreateClaim} from "../type/create-claim.type";

export abstract class CreateClaimDto implements TCreateClaim {
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

  @IsNumber()
  readonly saleAmount: number;

  @IsNumber()
  readonly amount: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => StoreDto)
  readonly store: Pick<IStore, "alias" | "id" | "name" | "currency">;

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


abstract class StoreDto implements Pick<IStore, "alias" | "id" | "name" | "currency"> {
  @IsString()
  readonly id: string;

  @IsString()
  readonly alias: string;

  @IsString()
  currency: string;

  @IsString()
  name: string;
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
