import {IBill} from "../../../domains/bill";
import {InsertOneResult} from "mongodb";

export abstract class IBillRepository {
  abstract create(entityLike: IBill): Promise<InsertOneResult<IBill>>
}
