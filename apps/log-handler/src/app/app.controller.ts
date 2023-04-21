import { Controller, Get } from "@nestjs/common";
import { Log } from "@store-apis/domains/log";

import { AppService } from "./app.service";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    const log = new Log({id: 'newId'})
    console.log(log);
    return this.appService.getData();
  }
}
