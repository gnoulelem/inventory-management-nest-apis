import {Bill, IBill, IBillItem} from "@store-apis/domains/bill";
import {InsertOneResult, UpdateResult} from "mongodb";

export abstract class IBillRepository {
  abstract createBill(entityLike: IBill): Promise<InsertOneResult<IBill>>

  abstract insertBillItem(entityLike: IBillItem, bill: Bill, period: string): Promise<UpdateResult<IBill>>

  abstract findBill(period: string): Promise<IBill>
}
