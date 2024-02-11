import { Component, OnInit, inject } from '@angular/core';
import { Transaction } from '../../domain/models/transaction.model';
import { GetAllTransactionsUseCase } from '../../application/get-all-transactions-use-case';
import { TransactionItemComponent } from '../transaction-item/transaction-item.component';
import { ButtonComponent } from '../ui/button/button.component';
import { GetAllMembersUseCase } from '../../application/get-all-members-use-case';
import { Member } from '../../domain/models/member.model';
import { SetTransactionUseCase } from '../../application/set-transaction-use-case';
import { randomIntFromInterval } from '../../shared/utils/number';

@Component({
  selector: 'transactions-section',
  standalone: true,
  imports: [TransactionItemComponent, ButtonComponent],
  templateUrl: './transactions-section.component.html',
  styleUrl: './transactions-section.component.css',
})
export class TransactionsSectionComponent implements OnInit {
  getAllTransactions = inject(GetAllTransactionsUseCase);
  getAllMembers = inject(GetAllMembersUseCase);
  setTransaction = inject(SetTransactionUseCase);

  transactions: Transaction[] = [];
  members: Member[] = [];

  ngOnInit(): void {
    this.getAllTransactions.execute().subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
    });
    this.getAllMembers.execute().subscribe({
      next: (members) => {
        this.members = members;
      },
    });
  }

  addRandomTransaction() {
    const randomMemberIndex = randomIntFromInterval(0, this.members.length - 1);
    const randomTransactionValue = randomIntFromInterval(1, 200);
    this.setTransaction
      .execute(
        this.members[randomMemberIndex]!,
        'Random Transaction',
        randomTransactionValue
      )
      .subscribe((transaction) => {
        this.transactions = [...this.transactions, transaction];
      });
  }
}
