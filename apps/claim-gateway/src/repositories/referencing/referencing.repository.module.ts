import {Module} from "@nestjs/common";
import {ReferencingDataSourceModule} from "../../data-sources/referencing/referencing.data-source.module";
import {IReferencingRepository} from "./interface/referencing.repository.interface";
import {ReferencingRepository} from "./repository/referencing.repository";

@Module({
  imports: [ReferencingDataSourceModule.forFeatureAsync()],
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
