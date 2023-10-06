import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@store-apis/repositories/auth';
import { GCPLogging } from '@store-apis/repositories/shared';
import { InsiderService } from '../../../service/insider.service';
import { UserRecord } from 'firebase-admin/lib/auth';

@Controller('v1/insider')
export class InsiderController {
  constructor(private readonly insiderService: InsiderService) {}

  @Get('/:phoneNumber')
  @UseGuards(AuthGuard)
  @GCPLogging
  getOrCreate(
    @Request() _request: Request,
    @Param('phoneNumber') phoneNumber: string
  ): Promise<UserRecord> {
    return this.insiderService.getOrCreate(phoneNumber);
  }
}
