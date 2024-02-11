import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TransactionsSectionComponent } from './transactions-section.component';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { MemberRepository } from '../../domain/repositories/member.repository';
import { getAppInitialData } from '../../mocks/app-initial-data';
import { Transaction } from '../../domain/models/transaction.model';

describe('TransactionsSectionComponent', () => {
  let component: TransactionsSectionComponent;
  let fixture: ComponentFixture<TransactionsSectionComponent>;
  let MemberRepositorySpy: jasmine.SpyObj<MemberRepository>;
  let TransactionRepositorySpy: jasmine.SpyObj<TransactionRepository>;

  beforeEach(async () => {
    MemberRepositorySpy = jasmine.createSpyObj<MemberRepository>(
      'MemberRepository',
      ['getAll', 'set']
    );
    MemberRepositorySpy.getAll.and.returnValue(of(getAppInitialData().members));

    TransactionRepositorySpy = jasmine.createSpyObj<TransactionRepository>(
      'TransactionRepository',
      ['getAll', 'set']
    );
    TransactionRepositorySpy.getAll.and.returnValue(
      of(getAppInitialData().transactions)
    );

    await TestBed.configureTestingModule({
      imports: [TransactionsSectionComponent],
      providers: [
        {
          provide: MemberRepository,
          useValue: MemberRepositorySpy,
        },
        {
          provide: TransactionRepository,
          useValue: TransactionRepositorySpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of transactions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toEqual(
      getAppInitialData().transactions.length
    );
  });

  it('should set a new random transaction', async () => {
    const newTransaction: Transaction = {
      id: getAppInitialData().transactions.length + 1,
      amount: {
        value: 40,
        currency: 'EUR',
      },
      member: getAppInitialData().members[0],
      description: 'Random Transaction',
      date: new Date(),
    };
    TransactionRepositorySpy.set.and.returnValue(of(newTransaction));

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button') as HTMLButtonElement;
    button.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(compiled.querySelectorAll('li').length).toEqual(
      getAppInitialData().transactions.length + 1
    );
  });
});
