import firebaseAdmin from "firebase-admin";
import { Module } from "@nestjs/common";
import { FirebaseAdminAuth } from "./provider/auth.provider";

@Module({
    providers: [
        {
            provide: FirebaseAdminAuth,
            useFactory: (): FirebaseAdminAuth => firebaseAdmin.auth()
        }
    ]
})
export class AuthDataSourceModule {}