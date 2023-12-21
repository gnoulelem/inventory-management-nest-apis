import {Module} from "@nestjs/common";
import {ReferencingDataSourceModule} from "@store-apis/data-sources/referencing";
import {IReferencingRepository} from "./interface/referencing.repository.interface";
import {ReferencingRepository} from "./repository/referencing.repository";

@Module({
  imports: [ReferencingDataSourceModule],
  providers: [
    {
      provide: IReferencingRepository,
      useClass: ReferencingRepository
    }
  ],
  exports: [IReferencingRepository]
})
export class ReferencingRepositoryModule {
}
