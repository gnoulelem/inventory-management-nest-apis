import { IUser } from "@store-apis/domains/auth";

export abstract class IAuthRepository {
    abstract createUser(entityLike: IUser): Promise<void>
}