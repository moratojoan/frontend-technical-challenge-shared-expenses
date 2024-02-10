import { Observable } from 'rxjs';
import { Transaction } from '../models/expense.model';

export abstract class TransactionRepository {
  abstract getAll(): Observable<Transaction[]>;
}
