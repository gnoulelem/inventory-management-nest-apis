export interface IIncome {
  readonly id: string;
  readonly billId: string;
  readonly claimId: string;
  readonly kind: "REFERENCING";
  readonly storeId: string;
  readonly amount: number;
  readonly state: "LATENT" | "EFFECTIVE" | "PAID";
  readonly createdAt: number;
}
