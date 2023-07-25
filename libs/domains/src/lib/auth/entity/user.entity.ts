import { IUser } from "../interface/auth.interface";

export class User implements IUser {
    id: string;

    constructor(entityLike: IUser) {
        this.id = entityLike.id
    }
}