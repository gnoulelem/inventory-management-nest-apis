import {Module} from "@nestjs/common";
import {ReferencingProvider} from "./provider/referencing.provider";
import {IReferencingProvider} from "./provider/referencing.provider.interface";

@Module({
  providers: [
    {
      provide: IReferencingProvider,
      useClass: ReferencingProvider
    }
  ],
  exports: [IReferencingProvider]
})
export class ReferencingDataSourceModule {
}
