import { Member } from './member.model';
import { Amount } from './amount.model';

export interface Transaction {
  id: number;
  member: Member;
  amount: Amount;
  description: string;
  date: Date;
}
