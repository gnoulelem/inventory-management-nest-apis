import {InsertOneResult, UpdateResult, WithId} from "mongodb";
import {Bill, IBill, IBillItem} from "@store-apis/domains/bill";
import {Injectable} from "@nestjs/common";
import {IBillRepository} from "@store-apis/repositories/bill";
import {IBillProvider} from "@store-apis/data-sources/bill";

@Injectable()
export class BillRepository implements IBillRepository {
  constructor(private readonly billProvider: IBillProvider) {
  }

  createBill(entityLike: IBill): Promise<InsertOneResult<IBill>> {
    return this.billProvider.provider.insertOne(entityLike)
  }

  async insertBillItem(entityLike: IBillItem, bill: Bill, period: string): Promise<UpdateResult<IBill>> {
    const currentBill = await this.findBill(period);
    if (currentBill == null) {
      await this.createBill(bill)
    }
    return this.billProvider.provider.updateOne({period}, {$push: {items: entityLike}})
  }

  findBill(period: string): Promise<WithId<IBill>> {
    return this.billProvider.provider.findOne({period})
  }
}
