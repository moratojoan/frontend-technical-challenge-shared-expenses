import { TestBed } from '@angular/core/testing';
import { GetBalanceUseCase } from './get-balance-use-case';
import { MemberRepository } from '../domain/repositories/member.repository';
import { TransactionRepository } from '../domain/repositories/transaction.repository';
import { getAppInitialData } from '../mocks/app-initial-data';
import { firstValueFrom, of } from 'rxjs';

describe('GetBalanceUseCase', () => {
  let service: GetBalanceUseCase;
  let MemberRepositorySpy: jasmine.SpyObj<MemberRepository>;
  let TransactionRepositorySpy: jasmine.SpyObj<TransactionRepository>;

  beforeEach(() => {
    MemberRepositorySpy = jasmine.createSpyObj<MemberRepository>(
      'MemberRepository',
      ['getAll', 'set']
    );
    TransactionRepositorySpy = jasmine.createSpyObj<TransactionRepository>(
      'TransactionRepository',
      ['getAll']
    );

    TestBed.configureTestingModule({
      providers: [
        GetBalanceUseCase,
        {
          provide: MemberRepository,
          useValue: MemberRepositorySpy,
        },
        {
          provide: TransactionRepository,
          useValue: TransactionRepositorySpy,
        },
      ],
    });
    service = TestBed.inject(GetBalanceUseCase);
  });

  it('execute should return the balance', async () => {
    MemberRepositorySpy.getAll.and.returnValue(of(getAppInitialData().members));
    TransactionRepositorySpy.getAll.and.returnValue(
      of(getAppInitialData().transactions)
    );

    const balance = await firstValueFrom(service.execute());
    expect(balance).toEqual(getAppInitialData().balance);
  });
});
