import {Module} from "@nestjs/common";
import {IncomeDataSourceModule} from "../../data-sources/income/income.data-cource.module";
import {IIncomeRepository} from "./interface/income.repository.interface";
import {IncomeRepository} from "./repository/income.repository";

@Module({
  imports: [IncomeDataSourceModule.forFeatureAsync()],
  providers: [
    {
      provide: IIncomeRepository,
      useClass: IncomeRepository
    }
  ],
  exports: [IIncomeRepository]
})
export class IncomeRepositoryModule {}
