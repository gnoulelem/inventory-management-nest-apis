import {Body, Controller, Post} from '@nestjs/common';

import {AppService} from '../service/app.service';
import {CreateClaimDto, TCreateClaim} from "../../../../domains/claim";
import {RealIP} from "nestjs-real-ip";
import {v4 as uuidV4} from "uuid";

@Controller('v1/claim')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post('/')
  async postClaim(@Body() createClaimDto: CreateClaimDto, @RealIP() ipAddress: string) {
    const claim: TCreateClaim & {
      readonly id: string;
      readonly createdAt: number;
      readonly state: 'LATENT'
    } = {
      id: uuidV4(),
      createdAt: Date.now(),
      state: 'LATENT',
      meta: {
        ...createClaimDto.meta,
        ipAddress,
      },
      ...createClaimDto
    }

    return this.appService.handleClaim(claim);
  }
}
