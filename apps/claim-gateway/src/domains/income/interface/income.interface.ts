export interface IIncome {
  readonly id: string;
  readonly billId: string;
  readonly claimId: string;
  readonly kind: TIncomeKind;
  readonly storeId: string;
  readonly amount: number;
  readonly state: TIncomeState;
  readonly createdAt: number;
}

type TIncomeKind = "REFERENCING"

type TIncomeState = "LATENT" | "EFFECTIVE" | "PAID";
