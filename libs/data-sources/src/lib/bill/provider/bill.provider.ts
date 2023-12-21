import {Collection} from "mongodb";
import {IBill} from "@store-apis/domains/bill";
import {IMongoDbClaimProvider} from "@store-apis/providers/mongodb";
import {IBillProvider} from "./bill.provider.interface";
import {Injectable} from "@nestjs/common";

@Injectable()
export class BillProvider implements IBillProvider {
  provider: Collection<IBill>;

  constructor(private readonly claimProvider: IMongoDbClaimProvider) {
    this.provider = this.claimProvider.db('operations').collection('bills')
  }
}
