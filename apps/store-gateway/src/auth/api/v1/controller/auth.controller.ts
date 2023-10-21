import {Body, Controller, Post, Request} from "@nestjs/common";
import {AuthService} from "../../../service/auth.service";
import {UserRecord} from "firebase-admin/lib/auth";
import {CreateUserDto} from "@store-apis/domains/auth";

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/user')
  async createUser(@Request() _request: Request, @Body() user: CreateUserDto): Promise<UserRecord> {
    return this.authService.createUser(user)
  }
}
