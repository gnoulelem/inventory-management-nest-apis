import {IInsiderRepository} from "../interface/insider.repository.interface";
import {TCreateInsider} from "@store-apis/domains/insider";
import {auth} from "firebase-admin";
import {IInsiderProvider} from "@store-apis/data-sources/insider";
import {Injectable} from "@nestjs/common";

@Injectable()
export class InsiderRepository implements IInsiderRepository {
  constructor(private readonly insiderProvider: IInsiderProvider) {
  }

  createInsider(user: TCreateInsider): Promise<auth.UserRecord> {
    return this.insiderProvider.createUser(user)
  }

  retrieveInsiderByPhoneNumber(phoneNumber: string): Promise<auth.UserRecord> {
    return this.insiderProvider.getUserByPhoneNumber(phoneNumber)
  }
}
