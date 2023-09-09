import { Module } from '@nestjs/common';
import { EmployeeController } from './api/v1/controller/employee.controller';
import { EmployeeRepositoryModule } from '@store-apis/repositories/employee';
import { EmployeeService } from './service/employee.service';
import { AuthRepositoryModule } from '@store-apis/repositories/auth';

@Module({
  imports: [EmployeeRepositoryModule, AuthRepositoryModule],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
