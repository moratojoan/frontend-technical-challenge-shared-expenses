import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import '@angular/common/locales/global/es';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { getAppInitialData } from './mocks/app-initial-data';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    const TransactionRepositorySpy =
      jasmine.createSpyObj<TransactionRepository>('TransactionRepository', [
        'getAll',
      ]);
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: TransactionRepository,
          useValue: TransactionRepositorySpy,
        },
      ],
    }).compileComponents();
    TransactionRepositorySpy.getAll.and.returnValue(
      of(getAppInitialData().transactions)
    );
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Gastos compartidos'
    );
  });

  it('should render a list of transactions', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li').length).toEqual(3);
  });
});
