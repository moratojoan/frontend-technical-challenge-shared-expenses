import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

export abstract class TransactionRepository {
  abstract getAll(): Observable<Transaction[]>;
}
