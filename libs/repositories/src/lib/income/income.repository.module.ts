import {Module} from "@nestjs/common";
import {IncomeDataSourceModule} from "@store-apis/data-sources/income";
import {IIncomeRepository} from "./interface/income.repository.interface";
import {IncomeRepository} from "./repository/income.repository";

@Module({
  imports: [IncomeDataSourceModule],
  providers: [
    {
      provide: IIncomeRepository,
      useClass: IncomeRepository
    }
  ],
  exports: [IIncomeRepository]
})
export class IncomeRepositoryModule {}
