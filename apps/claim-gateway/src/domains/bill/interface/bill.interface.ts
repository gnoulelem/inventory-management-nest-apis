export interface IBill {
  readonly id: string;
  readonly storeId: string;
  readonly period: string;
  readonly items: IBillItem[];
  readonly state: IBillState;
  readonly dueAt: number;
  readonly createdAt: number;
}

interface IBillItem {
  readonly id: string;
  readonly claimId: string;
  readonly saleAmount: number;
  readonly claimAmount: number;
  readonly amount: number;
  readonly insiderPhoneNumber: string;
  readonly createdAt: number;
}

interface IBillState {
  readonly paid: boolean;
  readonly paidAt: number;
  readonly paymentDetails: IPaymentDetails
}

interface IPaymentDetails {
  readonly method: string;
  readonly reference: string;
}
