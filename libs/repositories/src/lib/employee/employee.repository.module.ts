import { Module } from '@nestjs/common';
import { EmployeeDataSourceModule } from '@store-apis/data-sources/employee';
import { IEmployeeRepository } from './interface/employee.repository.interface';
import { EmployeeRepository } from './repository/employee.repository';

@Module({
  imports: [EmployeeDataSourceModule.forFeatureAsync()],
  providers: [
    {
      provide: IEmployeeRepository,
      useClass: EmployeeRepository,
    },
  ],
  exports: [IEmployeeRepository],
})
export class EmployeeRepositoryModule {}
