import { Component, Input } from '@angular/core';
import { Balance } from '../../domain/models/balance.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'member-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './member-item.component.html',
  styleUrl: './member-item.component.css',
})
export class MemberItemComponent {
  @Input({ required: true }) memberBalance!: Balance['membersBalance'][number];
}
