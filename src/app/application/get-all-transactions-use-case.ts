import { Observable } from 'rxjs';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { Transaction } from '../domain/models/transaction.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetAllTransactionsUseCase {
  transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  execute(): Observable<Transaction[]> {
    return this.transactionRepository.getAll();
  }
}
