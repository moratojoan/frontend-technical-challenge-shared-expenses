import { Component } from '@angular/core';
import { Transaction } from './domain/models/expense.model';
import { getAppInitialData } from './mocks/app-initial-data';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  transactions: Transaction[] = getAppInitialData().transactions;
}
