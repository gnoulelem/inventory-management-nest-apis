import {Module} from "@nestjs/common";
import {IncomeProvider} from "./provider/income.provider";
import {IIncomeProvider} from "./provider/income.provider.interface";

@Module({
  providers: [
    {
      provide: IIncomeProvider,
      useClass: IncomeProvider
    }
  ],
  exports: [IIncomeProvider]
})
export class IncomeDataSourceModule {
}
