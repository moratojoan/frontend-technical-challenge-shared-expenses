import { Component, OnInit, inject } from '@angular/core';
import { Transaction } from './domain/models/expense.model';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { getAppInitialData } from './mocks/app-initial-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  transactions: Transaction[] = [];
  transactionRepository = inject(TransactionRepository);

  ngOnInit(): void {
    this.transactionRepository.getAll().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
    });
  }
}
