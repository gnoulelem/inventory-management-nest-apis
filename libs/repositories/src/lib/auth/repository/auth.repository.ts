import { IUser } from "@store-apis/domains/auth";
import { IAuthRepository } from "../interface/auth.repository.interface";
import { Injectable } from "@nestjs/common";
import { FirebaseAdminAuth } from "@store-apis/data-sources/auth";

@Injectable()
export class AuthRepository implements IAuthRepository {

    constructor(private readonly adminAuth: FirebaseAdminAuth) {}

    async createUser(entityLike: IUser): Promise<void> {
        console.log(this.adminAuth.listUsers())
    }
    
}