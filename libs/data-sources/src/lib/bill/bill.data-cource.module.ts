import {Module} from "@nestjs/common";
import {BillProvider} from "./provider/bill.provider";
import {IBillProvider} from "./provider/bill.provider.interface";

@Module({
  providers: [
    {
      provide: IBillProvider,
      useClass: BillProvider
    }
  ],
  exports: [IBillProvider]
})
export class BillDataSourceModule {
}
