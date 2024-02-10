import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TransactionRepository } from './domain/repositories/transaction.repository';
import { LocalStorageTransactionRepository } from './infraestructure/repositories/local-storage-transaction.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: TransactionRepository,
      useClass: LocalStorageTransactionRepository,
    },
  ],
};
