import { Component, OnInit, inject } from '@angular/core';
import { Transaction } from '../../domain/models/expense.model';
import { GetAllTransactionsUseCase } from '../../application/get-all-transactions-use-case';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'transactions-section',
  standalone: true,
  imports: [TransactionItemComponent, ButtonComponent],
  templateUrl: './transactions-section.component.html',
  styleUrl: './transactions-section.component.css',
})
export class TransactionsSectionComponent implements OnInit {
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
