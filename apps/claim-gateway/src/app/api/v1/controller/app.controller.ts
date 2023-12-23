import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';

import {AppService} from '../service/app.service';
import {CreateClaimDto, TCreateClaim} from "@store-apis/domains/claim";
import {RealIP} from "nestjs-real-ip";
import {v4 as uuidV4} from "uuid";
import {UserRecord} from "firebase-admin/lib/auth";
import {CreateInsiderDto} from "../dto/insider.dto";
import {AuthGuard} from "@store-apis/repositories/auth";
import {GCPLogging} from "@store-apis/repositories/shared";
import {IEmployee} from "@store-apis/domains/employee";
import {IStore} from "@store-apis/domains/shared";

@Controller('v1/')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post('/claim')
  async postClaim(@Request() _request: Request, @Body() createClaimDto: CreateClaimDto, @RealIP() ipAddress: string) {
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
  async getInsider(@Request() _request: Request, @Param('phoneNumber') phoneNumber: string): Promise<UserRecord> {
    return this.appService.getInsider(phoneNumber);
  }

  @Post('/insider')
  @UseGuards(AuthGuard)
  @GCPLogging
  async postInsider(@Request() _request: Request, @Body() {phoneNumber}: CreateInsiderDto): Promise<UserRecord> {
    return this.appService.createInsider(phoneNumber);
  }

  @Get('/employee/me')
  @UseGuards(AuthGuard)
  @GCPLogging
  async getStoreEmployee(@Request() _request: Request): Promise<IEmployee> {
    return this.appService.getStoreEmployee(_request['user'].sub)
  }

  @Get('/store/:alias')
  @UseGuards(AuthGuard)
  @GCPLogging
  async getStoreConfig(@Request() _request: Request, @Param('alias') alias: string): Promise<IStore> {
    return this.appService.getStoreConfig(alias);
  }
}
