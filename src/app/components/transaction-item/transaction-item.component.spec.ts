import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionItemComponent } from './transaction-item.component';
import { Transaction } from '../../domain/models/expense.model';
import { formatDate, getCurrencySymbol } from '@angular/common';

const transaction: Transaction = {
  id: 0,
  member: {
    id: 0,
    name: 'Joan',
  },
  description: 'Pan',
  amount: {
    value: 4,
    currency: 'EUR',
  },
  date: new Date(),
};
describe('TransactionItemComponent', () => {
  let component: TransactionItemComponent;
  let fixture: ComponentFixture<TransactionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionItemComponent);
    component = fixture.componentInstance;
    component.transaction = transaction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render: member name, description, price & date', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain(
      transaction.member.name
    );
    expect(compiled.querySelector('li').textContent).toContain(
      transaction.description
    );
    expect(compiled.querySelector('li').textContent).toContain(
      transaction.amount.value
    );
    expect(compiled.querySelector('li').textContent).toContain(
      getCurrencySymbol(transaction.amount.currency, 'wide')
    );
    expect(compiled.querySelector('li').textContent).toContain(
      formatDate(transaction.date, 'd MMMM, y, h:mm a', 'es')
    );
  });
});
