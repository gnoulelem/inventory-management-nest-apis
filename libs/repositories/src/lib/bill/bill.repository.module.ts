import {Module} from "@nestjs/common";
import {BillDataSourceModule} from "@store-apis/data-sources/bill";
import {IBillRepository} from "./interface/bill.repository.interface";
import {BillRepository} from "./repository/bill.repository";

@Module({
  imports: [BillDataSourceModule],
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
