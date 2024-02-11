import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { DialogComponent } from '../ui/dialog/dialog.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SetMemberUseCase } from '../../application/set-member-use-case';
import { GetBalanceUseCase } from '../../application/get-balance-use-case';
import { Balance } from '../../domain/models/balance.model';
import { MemberItemComponent } from '../member-item/member-item.component';

@Component({
  selector: 'members-section',
  standalone: true,
  imports: [
    MemberItemComponent,
    ButtonComponent,
    DialogComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './members-section.component.html',
  styleUrl: './members-section.component.css',
})
export class MembersSectionComponent implements OnInit {
  getBalance = inject(GetBalanceUseCase);
  setMember = inject(SetMemberUseCase);

  membersBalance: Balance['membersBalance'] = [];
  totalTransactions: Balance['totalTransactions'] = {
    value: 0,
    currency: 'EUR',
  };

  @ViewChild(DialogComponent) dialog!: DialogComponent;
  addMemberForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  loadBalance() {
    this.getBalance.execute().subscribe({
      next: (balance) => {
        this.membersBalance = balance.membersBalance;
        this.totalTransactions = balance.totalTransactions;
      },
    });
  }

  ngOnInit(): void {
    this.loadBalance();
  }

  handleClickAddMember() {
    this.dialog.showModal();
  }

  submitMember() {
    if (this.addMemberForm.valid) {
      this.setMember
        .execute(this.addMemberForm.value.name ?? '')
        .subscribe(() => {
          this.loadBalance();
          this.dialog.closeModal();
        });
    }
  }
}
