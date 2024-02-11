import { Observable, of } from 'rxjs';
import { Transaction } from '../../domain/models/transaction.model';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Injectable } from '@angular/core';
import { getAppInitialData } from '../../mocks/app-initial-data';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageTransactionRepository
  implements TransactionRepository
{
  storageKey: string = 'transactions';

  constructor() {
    const transactions = this.getAllTransactions();
    const defaultTransactions = getAppInitialData().transactions;
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(
        transactions.length > 0 ? transactions : defaultTransactions
      )
    );
  }

  private getAllTransactions(): Transaction[] {
    const transactions: Transaction[] = JSON.parse(
      localStorage.getItem(this.storageKey) ?? '[]'
    );
    return transactions;
  }

  getAll(): Observable<Transaction[]> {
    const transactions = this.getAllTransactions();
    return of(transactions);
  }

  set(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    const transactions = this.getAllTransactions();
    const newTransactionId = transactions.length + 1;
    const newTransaction: Transaction = {
      id: newTransactionId,
      ...transaction,
    };
    const newTransactions: Transaction[] = [...transactions, newTransaction];
    localStorage.setItem(this.storageKey, JSON.stringify(newTransactions));
    return of(newTransaction);
  }
}
