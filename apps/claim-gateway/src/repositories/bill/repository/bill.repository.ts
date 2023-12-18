import {IBillRepository} from "../interface/bill.repository.interface";
import {InsertOneResult} from "mongodb";
import {IBill} from "../../../domains/bill";
import {IBillProvider} from "../../../data-sources/bill";

export class BillRepository implements IBillRepository {
  constructor(private readonly billProvider: IBillProvider) {
  }

  create(entityLike: IBill): Promise<InsertOneResult<IBill>> {
    return this.billProvider.insertOne(entityLike)
  }
}
