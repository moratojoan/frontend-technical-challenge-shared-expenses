import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsSectionComponent } from './transactions-section.component';
import { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { getAppInitialData } from '../../mocks/app-initial-data';
import { of } from 'rxjs';

describe('TransactionsSectionComponent', () => {
  let component: TransactionsSectionComponent;
  let fixture: ComponentFixture<TransactionsSectionComponent>;

  beforeEach(async () => {
    const TransactionRepositorySpy =
      jasmine.createSpyObj<TransactionRepository>('TransactionRepository', [
        'getAll',
      ]);
    TransactionRepositorySpy.getAll.and.returnValue(
      of(getAppInitialData().transactions)
    );

    await TestBed.configureTestingModule({
      imports: [TransactionsSectionComponent],
      providers: [
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
});
