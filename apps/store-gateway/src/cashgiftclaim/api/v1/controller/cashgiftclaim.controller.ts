import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@store-apis/repositories/auth";
import {GCPLogging} from "@store-apis/repositories/shared";
import {RealIP} from "nestjs-real-ip";
import {CreateCashgiftclaimDto, ICashgiftclaim, TCreateCashgiftclaim} from "@store-apis/domains/cashgiftclaim";
import {v4 as uuidV4} from "uuid";
import {CashgiftclaimService} from "../../../service/cashgiftclaim.service";
import {InsertOneResult} from "mongodb";

@Controller('v1/cashgiftclaim')
export class CashgiftclaimController {
  constructor(private readonly cashgiftclaimService: CashgiftclaimService) {
  }

  @Post('/')
  @UseGuards(AuthGuard)
  @GCPLogging
  async createCashgiftclaim(
    @Request() _request: Request,
    @Body() createCashgiftclaimBody: CreateCashgiftclaimDto,
    @RealIP() ipAddress: string
  ): Promise<InsertOneResult<ICashgiftclaim>> {
    const claim: TCreateCashgiftclaim & {
      readonly id: string;
      readonly createdAt: number;
    } = {
      ...createCashgiftclaimBody,
      id: uuidV4(),
      meta: {
        ...createCashgiftclaimBody.meta,
        ipAddress,
      },
      createdAt: Date.now(),
    };
    return this.cashgiftclaimService.createCashgiftclaim(claim)
  }
}
