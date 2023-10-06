import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ILog, ILogMetadata, ILogAgent } from '@store-apis/domains/log';

class LogMetadataDto implements ILogMetadata {
  @IsNumber()
  @IsNotEmpty()
  time: number;
}

class LogAgentDto implements ILogAgent {
  @IsNotEmpty()
  ipAddress: string;

  @IsNotEmpty()
  osType: string;

  @IsNotEmpty()
  osVersion: string;

  @IsNotEmpty()
  timeZone: string;

  @IsNotEmpty()
  browser: string;

  @IsNotEmpty()
  language: string;

  @IsNotEmpty()
  location: string;
}

export class CreateLogDto implements ILog {
  id: string;

  entityId: string;

  activity: string;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => LogMetadataDto)
  metadata: LogMetadataDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => LogAgentDto)
  agent: LogAgentDto;
}
