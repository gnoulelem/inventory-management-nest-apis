import {Module} from "@nestjs/common";
import {AuthRepositoryModule} from "@store-apis/repositories/auth";
import {AuthService} from "./service/auth.service";
import {AuthController} from "./api/v1/controller/auth.controller";

@Module({
  imports: [AuthRepositoryModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
