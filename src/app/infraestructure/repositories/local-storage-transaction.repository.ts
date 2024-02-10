import { Observable, map, of, take, tap } from 'rxjs';
import { Transaction } from '../../domain/models/expense.model';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { getAppInitialData } from '../../mocks/app-initial-data';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageTransactionRepository
  implements TransactionRepository
{
  storageKey: string = 'transactions';
  getAllTransactions(): Transaction[] {
    const transactions: Transaction[] = JSON.parse(
      localStorage.getItem(this.storageKey) ?? '[]'
    );
    return transactions;
  }

  getAll(): Observable<Transaction[]> {
    const transactions = this.getAllTransactions();
    return of(transactions);
  }
}
