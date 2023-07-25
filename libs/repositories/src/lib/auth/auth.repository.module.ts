import { Module } from "@nestjs/common";
import { AuthDataSourceModule} from "@store-apis/data-sources/auth"

@Module({
    imports: [
        AuthDataSourceModule
    ],
})
export class AuthRepositoryModule {}