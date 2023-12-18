import {IClaim} from "../interface/claim.interface";

export type TCreateClaim = Omit<IClaim, '_id' | 'id' | 'createdAt' | 'billId' | 'state'>
