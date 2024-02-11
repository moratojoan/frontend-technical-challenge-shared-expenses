import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberItemComponent } from './member-item.component';
import { Balance } from '../../domain/models/balance.model';
import { getCurrencySymbol } from '@angular/common';

const memberBalance: Balance['membersBalance'][number] = {
  member: {
    id: 0,
    name: 'Joan',
  },
  totalTransactions: {
    value: 400,
    currency: 'EUR',
  },
  balance: {
    value: 180,
    currency: 'EUR',
  },
};
describe('MemberItemComponent', () => {
  let component: MemberItemComponent;
  let fixture: ComponentFixture<MemberItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberItemComponent);
    component = fixture.componentInstance;
    component.memberBalance = memberBalance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render: member name, totalTransactions & balance', () => {
    const compiled = fixture.debugElement.nativeElement;
    const item = compiled.querySelector('li');
    expect(item.textContent).toContain(memberBalance.member.name);
    expect(item.textContent).toContain(memberBalance.totalTransactions.value);
    expect(item.textContent).toContain(
      getCurrencySymbol(memberBalance.totalTransactions.currency, 'wide')
    );
    expect(item.textContent).toContain(memberBalance.balance.value);
    expect(item.textContent).toContain(
      getCurrencySymbol(memberBalance.balance.currency, 'wide')
    );
  });
});
