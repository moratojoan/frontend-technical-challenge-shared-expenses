import { Component } from '@angular/core';
import { Transaction } from './domain/models/expense.model';
import { getAppInitialData } from './mocks/app-initial-data';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  transactions: Transaction[] = getAppInitialData().transactions;
}
