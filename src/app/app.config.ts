import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { LocalStorageTransactionRepository } from './infraestructure/repositories/local-storage-transaction.repository';
import { GetAllTransactionsUseCase } from './application/get-all-transactions-use-case';
import { GetAllMembersUseCase } from './application/get-all-members-use-case';
import { MemberRepository } from './domain/repositories/member.repository';
import { LocalStorageMemberRepository } from './infraestructure/repositories/local-storage-member.repository';

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
      provide: TransactionRepository,
      useClass: LocalStorageTransactionRepository,
    },
    {
      provide: MemberRepository,
      useClass: LocalStorageMemberRepository,
    },
  ],
};
