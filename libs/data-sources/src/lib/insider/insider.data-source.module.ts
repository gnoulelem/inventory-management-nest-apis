import {DynamicModule, Module} from '@nestjs/common';
import {IInsiderProvider} from './provider/insider.provider';
import {ModuleInit} from './core/module.init';

@Module({})
export class InsiderDataSourceModule {
  static register(): DynamicModule {
    return {
      module: InsiderDataSourceModule,
      providers: [
        {
          provide: IInsiderProvider,
          useFactory: (): IInsiderProvider => ModuleInit.init().auth(),
        },
      ],
      exports: [IInsiderProvider],
    };
  }
}
