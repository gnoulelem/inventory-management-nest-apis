import { Module } from '@nestjs/common';
import { StoreMetaDataSourceModule } from 'libs/data-sources/src/lib/storemeta';
import { IEmployeeRepository } from './interface/employee.repository.interface';
import { EmployeeRepository } from './repository/employee.repository';

@Module({
  imports: [StoreMetaDataSourceModule.forFeatureAsync()],
  providers: [
    {
      provide: IEmployeeRepository,
      useClass: EmployeeRepository,
    },
  ],
  exports: [IEmployeeRepository],
})
export class EmployeeRepositoryModule {}
