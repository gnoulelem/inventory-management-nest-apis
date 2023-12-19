export interface IBill {
  readonly id: string;
  readonly storeId: string;
  readonly period: string;
  readonly items: IBillItem[];
  readonly state: IBillState;
  readonly dueAt: number;
  readonly createdAt: number;
}

export interface IBillItem {
  readonly id: string;
  readonly claimId: string;
  readonly saleAmount: number;
  readonly amount: number;
  readonly insiderPhoneNumber: string;
  readonly createdAt: number;
}

export interface IBillState {
  readonly paid: boolean;
  readonly paidAt: number | undefined;
  readonly paymentDetails: IPaymentDetails | undefined
}

interface IPaymentDetails {
  readonly method: string;
  readonly reference: string;
}
