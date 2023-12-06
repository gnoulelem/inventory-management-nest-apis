import {ICashgiftclaim} from "@store-apis/domains/cashgiftclaim";

export type TCreateCashgiftclaim = Omit<ICashgiftclaim, '_id' | 'id' | 'createdAt'>
