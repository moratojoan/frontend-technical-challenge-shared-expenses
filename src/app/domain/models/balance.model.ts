import { Amount } from './amount.model';
import { Member } from './member.model';

interface MemberBalance {
  member: Member;
  totalTransactions: Amount;
  balance: Amount;
}

export interface Balance {
  totalTransactions: Amount;
  membersBalance: MemberBalance[];
}
