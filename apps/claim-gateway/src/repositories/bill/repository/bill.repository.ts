import {IBillRepository} from "../interface/bill.repository.interface";
import {InsertOneResult, UpdateResult, WithId} from "mongodb";
import {Bill, IBill, IBillItem} from "../../../domains/bill";
import {IBillProvider} from "../../../data-sources/bill";
import {Injectable} from "@nestjs/common";

@Injectable()
export class BillRepository implements IBillRepository {
  constructor(private readonly billProvider: IBillProvider) {
  }

  createBill(entityLike: IBill): Promise<InsertOneResult<IBill>> {
    return this.billProvider.insertOne(entityLike)
  }

  async insertBillItem(entityLike: IBillItem, bill: Bill, period: string): Promise<UpdateResult<IBill>> {
    const currentBill = await this.findBill(period);
    if (currentBill == null) {
      await this.createBill(bill)
    }
    return this.billProvider.updateOne({period}, {$push: {items: entityLike}})
  }

  findBill(period: string): Promise<WithId<IBill>> {
    return this.billProvider.findOne({period})
  }
}
