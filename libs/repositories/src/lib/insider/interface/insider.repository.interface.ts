import {auth} from 'firebase-admin';
import UserRecord = auth.UserRecord;
import {TCreateInsider} from "@store-apis/domains/insider";

export abstract class IInsiderRepository {
  abstract createInsider(user: TCreateInsider): Promise<UserRecord>
  abstract retrieveInsiderByPhoneNumber(phoneNumber: string): Promise<UserRecord>
}
