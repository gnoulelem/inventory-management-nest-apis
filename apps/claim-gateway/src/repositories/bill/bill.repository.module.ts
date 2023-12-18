import {Module} from "@nestjs/common";
import {BillDataSourceModule} from "../../data-sources/bill";
import {IBillRepository} from "./interface/bill.repository.interface";
import {BillRepository} from "./repository/bill.repository";

@Module({
  imports: [BillDataSourceModule.forFeatureAsync()],
  providers: [
    {
      provide: IBillRepository,
      useClass: BillRepository
    }
  ],
  exports: [IBillRepository]
})
export class BillRepositoryModule {
}
