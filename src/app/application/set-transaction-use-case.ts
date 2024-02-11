import { Observable } from 'rxjs';
import { MemberRepository } from '../domain/repositories/member.repository';
import { Injectable } from '@angular/core';
import { Member } from '../domain/models/member.model';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { Transaction } from '../domain/models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class SetTransactionUseCase {
  transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  execute(
    member: Member,
    description: string,
    transactionValue: number
  ): Observable<Transaction> {
    const transaction: Omit<Transaction, 'id'> = {
      member,
      description,
      amount: { value: transactionValue, currency: 'EUR' },
      date: new Date(),
    };

    return this.transactionRepository.set(transaction);
  }
}
