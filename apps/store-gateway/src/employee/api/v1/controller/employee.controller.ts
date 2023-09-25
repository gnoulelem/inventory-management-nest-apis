import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { IEmployee } from '@store-apis/domains/employee';
import { EmployeeService } from '../../../service/employee.service';
import { AuthGuard } from '@store-apis/repositories/auth';
import { GCPLogging } from '@store-apis/repositories/shared';

@Controller('v1/storemeta')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  @GCPLogging
  async getMe(@Request() _request: Request): Promise<IEmployee> {
    return this.employeeService.getMe(_request['user'].sub);
  }
}
