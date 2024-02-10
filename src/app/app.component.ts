import { Component, OnInit, inject } from '@angular/core';
import { Transaction } from './domain/models/expense.model';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';
import { GetAllTransactionsUseCase } from './application/get-all-transactions-use-case';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  transactions: Transaction[] = [];
  getAllTransactions = inject(GetAllTransactionsUseCase);

  ngOnInit(): void {
    this.getAllTransactions.execute().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
    });
  }
}
