import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';

import {AppService} from '../service/app.service';
import {CreateClaimDto, TCreateClaim} from "../../../../domains/claim";
import {RealIP} from "nestjs-real-ip";
import {v4 as uuidV4} from "uuid";
import {UserRecord} from "firebase-admin/lib/auth";
import {CreateInsiderDto} from "../dto/insider.dto";
import {AuthGuard} from "@store-apis/repositories/auth";
import {GCPLogging} from "@store-apis/repositories/shared";

@Controller('v1/')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post('/claim')
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

  @Get('/insider/:phoneNumber')
  @UseGuards(AuthGuard)
  @GCPLogging
  async getInsider(@Param('phoneNumber') phoneNumber: string): Promise<UserRecord> {
    return this.appService.getInsider(phoneNumber);
  }

  @Post('/insider')
  @UseGuards(AuthGuard)
  @GCPLogging
  async postInsider(@Body() {phoneNumber}: CreateInsiderDto): Promise<UserRecord> {
    return this.appService.createInsider(phoneNumber);
  }
}
