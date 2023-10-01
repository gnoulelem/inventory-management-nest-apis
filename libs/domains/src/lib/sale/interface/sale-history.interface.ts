import { ISale } from './sale.interface';

export interface ISaleHistory {
  [date: string]: ISale[];
}
