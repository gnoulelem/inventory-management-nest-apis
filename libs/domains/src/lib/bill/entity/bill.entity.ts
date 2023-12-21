import {IBill, IBillItem, IBillState} from "../interface/bill.interface";
import {IClaim} from "../../claim";
import {v4 as uuidV4} from "uuid";
import {IStore} from "@store-apis/domains/shared";

export class Bill implements IBill {
  readonly createdAt: number;
  readonly dueAt: number;
  readonly id: string;
  readonly items: IBillItem[];
  readonly period: string;
  readonly state: IBillState;
  readonly storeId: string;

  constructor(entityLike: IClaim, billId: string) {
    this.id = billId;
    this.storeId = entityLike.store.id;
    this.period = new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
    this.state = {
      paid: false,
      paidAt: undefined,
      paymentDetails: undefined
    };
    this.dueAt = getFifthDayOfNextMonth();
    this.items = [];
    this.createdAt = Date.now();
  }
}

export class BillItem implements IBillItem {
  readonly amount: number;
  readonly claimId: string;
  readonly createdAt: number;
  readonly id: string;
  readonly insiderPhoneNumber: string;
  readonly saleAmount: number;

  constructor(entityLike: IClaim, store: IStore) {
    this.id = uuidV4()
    this.amount = (entityLike.saleAmount * store.quidCashGiftConfig.grantedPercentagePerSale) / 100;
    this.claimId = entityLike.id;
    this.insiderPhoneNumber = entityLike.insider.phoneNumber;
    this.saleAmount = entityLike.saleAmount;
    this.createdAt = Date.now();
  }
}

const getFifthDayOfNextMonth = (): number => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 1, 1);
  currentDate.setDate(5);
  return currentDate.getTime();
}
