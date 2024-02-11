import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GetAllTransactionsUseCase } from './application/get-all-transactions-use-case';
import { GetAllMembersUseCase } from './application/get-all-members-use-case';
import { SetMemberUseCase } from './application/set-member-use-case';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { MemberRepository } from './domain/repositories/member.repository';
import { LocalStorageTransactionRepository } from './infraestructure/repositories/local-storage-transaction.repository';
import { LocalStorageMemberRepository } from './infraestructure/repositories/local-storage-member.repository';
import { GetBalanceUseCase } from './application/get-all-balance-use-case';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: GetAllTransactionsUseCase,
      useClass: GetAllTransactionsUseCase,
    },
    {
      provide: GetAllMembersUseCase,
      useClass: GetAllMembersUseCase,
    },
    {
      provide: SetMemberUseCase,
      useClass: SetMemberUseCase,
    },
    {
      provide: GetBalanceUseCase,
      useClass: GetBalanceUseCase,
    },
    {
      provide: TransactionRepository,
      useClass: LocalStorageTransactionRepository,
    },
    {
      provide: MemberRepository,
      useClass: LocalStorageMemberRepository,
    },
  ],
};
