import { Component, Input } from '@angular/core';
import { Transaction } from '../../domain/models/expense.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'transaction-item',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.css',
})
export class TransactionItemComponent {
  @Input({ required: true }) transaction!: Transaction;
}
