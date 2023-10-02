import { ISale } from '../interface/sale.interface';

export type TCreateSale = Omit<ISale, '_id' | 'id' | 'saleId' | 'createdAt'>;
