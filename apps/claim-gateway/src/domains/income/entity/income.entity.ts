import {v4 as uuidV4} from "uuid";
import {IIncome} from "../interface/income.interface";
import {IClaim} from "../../claim";
import {IBill, IBillItem} from "../../bill";
import {IStore} from "@store-apis/domains/shared";
import {IReferencing} from "../../referencing";

export class Income implements IIncome {
  readonly amount: number;
  readonly billId: string;
  readonly claimId: string;
  readonly createdAt: number;
  readonly id: string;
  readonly kind: "REFERENCING";
  readonly state: "LATENT" | "EFFECTIVE" | "PAID";
  readonly storeId: string;

  constructor(claim: IClaim, bill: IBill, billItem: IBillItem, storeConfig: IStore, referencing: IReferencing) {
    this.id = uuidV4();
    this.billId = bill.id;
    this.claimId = claim.id;
    this.kind = "REFERENCING";
    this.state = "LATENT";
    this.storeId = referencing.referrer.id;
    this.amount = (billItem.amount * storeConfig.quidCashGiftConfig.sponsorGrantedPercentagePerSale) / 100
    this.createdAt = Date.now();
  }
}
