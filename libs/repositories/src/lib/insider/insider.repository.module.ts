import {Module} from "@nestjs/common";
import {InsiderDataSourceModule} from "@store-apis/data-sources/insider";
import {IInsiderRepository} from "./interface/insider.repository.interface";
import {InsiderRepository} from "./repository/insider.repository";

@Module({
  imports: [InsiderDataSourceModule.register()],
  providers: [
    {
      provide: IInsiderRepository,
      useClass: InsiderRepository
    }
  ],
  exports: [IInsiderRepository]
})
export class InsiderRepositoryModule {}
