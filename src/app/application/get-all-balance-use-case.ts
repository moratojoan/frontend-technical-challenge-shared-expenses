import { Injectable } from '@angular/core';
import { Observable, combineLatest, forkJoin, map, merge, of } from 'rxjs';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { MemberRepository } from '../domain/repositories/member.repository';
import { Member } from '../domain/models/member.model';
import { Transaction } from '../domain/models/transaction.model';
import { Balance } from '../domain/models/balance.model';

@Injectable({
  providedIn: 'root',
})
export class GetBalanceUseCase {
  transactionRepository: TransactionRepository;
  memberRepository: MemberRepository;
  constructor(
    transactionRepository: TransactionRepository,
    memberRepository: MemberRepository
  ) {
    this.transactionRepository = transactionRepository;
    this.memberRepository = memberRepository;
  }

  private getTotalTransactions(transactions: Transaction[]): number {
    const totalTransactions = transactions.reduce((acc, current) => {
      return acc + current.amount.value;
    }, 0);
    return totalTransactions;
  }

  private getMemberTransactions(member: Member, transactions: Transaction[]) {
    return transactions.filter(
      (transaction) => transaction.member.id === member.id
    );
  }
  execute(): Observable<Balance> {
    const transactions = this.transactionRepository.getAll();
    const members = this.memberRepository.getAll();
    return combineLatest([transactions, members]).pipe(
      map(([transactions, members]) => {
        const totalTransactions = this.getTotalTransactions(transactions);
        const totalMembers = members.length;
        const expectedTransactionsByMember = totalTransactions / totalMembers;

        const membersBalance: Balance['membersBalance'][number][] = members.map(
          (member) => {
            const memberTransactions = this.getMemberTransactions(
              member,
              transactions
            );
            const memberTotalTransactions =
              this.getTotalTransactions(memberTransactions);
            const memberBalance =
              memberTotalTransactions - expectedTransactionsByMember;

            return {
              member,
              totalTransactions: {
                value: memberTotalTransactions,
                currency: 'EUR',
              },
              balance: {
                value: memberBalance,
                currency: 'EUR',
              },
            };
          }
        );

        return {
          totalTransactions: {
            value: totalTransactions,
            currency: 'EUR',
          },
          membersBalance,
        };
      })
    );
  }
}
