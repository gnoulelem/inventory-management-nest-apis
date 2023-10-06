import {  Body, Controller, Post } from "@nestjs/common";

import { AppService } from "./app.service";
import { CreateLogDto } from "./dtos/create-log.dto";


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Post()
  store(@Body() createLogDto: CreateLogDto) {
    return createLogDto
  }
  
  /*@Get()
  getData() {
    const log = new Log({id: 'newId'})
    console.log(log);
    return this.appService.getData();
  }*/
}
