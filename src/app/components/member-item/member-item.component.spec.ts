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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render: member name, totalTransactions & balance', () => {
    component.memberBalance = memberBalance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    const item = compiled.querySelector('li');
    expect(item?.textContent).toContain(memberBalance.member.name);
    expect(item?.textContent).toContain(memberBalance.totalTransactions.value);
    expect(item?.textContent).toContain(
      getCurrencySymbol(memberBalance.totalTransactions.currency, 'wide')
    );
    expect(item?.textContent).toContain(memberBalance.balance.value);
    expect(item?.textContent).toContain(
      getCurrencySymbol(memberBalance.balance.currency, 'wide')
    );
  });

  it('should render the balance with a class named "positive" when the balance is positive', () => {
    component.memberBalance = memberBalance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    const balance = compiled.querySelector('.balance.positive');
    expect(balance).toBeTruthy();
  });

  it('should render the balance with a class named "positive" when the balance is zero', () => {
    component.memberBalance = {
      ...memberBalance,
      balance: { value: 0, currency: memberBalance.balance.currency },
    };
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    const balance = compiled.querySelector('.balance.positive');
    expect(balance).toBeTruthy();
  });

  it('should render the balance with a class named "negative" when the balance is negative', () => {
    component.memberBalance = {
      ...memberBalance,
      balance: { value: -10, currency: memberBalance.balance.currency },
    };
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement as HTMLElement;
    const balance = compiled.querySelector('.balance.negative');
    expect(balance).toBeTruthy();
  });
});
