import { Transaction } from '../domain/models/transaction.model';
import { Member } from '../domain/models/member.model';
import { Balance } from '../domain/models/balance.model';

type AppInitialData = {
  members: Member[];
  transactions: Transaction[];
  balance: Balance;
};
export function getAppInitialData(): AppInitialData {
  const members = [
    {
      id: 1,
      name: 'Joan Morató',
    },
    {
      id: 2,
      name: 'Francisco Buyo',
    },
    {
      id: 3,
      name: 'Alfonso Pérez',
    },
  ];
  return {
    members,
    transactions: [
      {
        id: 0,
        description: 'Cena',
        amount: {
          value: 100,
          currency: 'EUR',
        },
        member: members[0],
        date: new Date('2024-01-17T22:35:00'),
      },
      {
        id: 0,
        description: 'Taxi',
        amount: {
          value: 25,
          currency: 'EUR',
        },
        member: members[0],
        date: new Date('2024-01-17T23:18:00'),
      },
      {
        id: 0,
        description: 'Compra',
        amount: {
          value: 180,
          currency: 'EUR',
        },
        member: members[1],
        date: new Date('2024-01-22T10:23:00'),
      },
    ],
    balance: {
      totalTransactions: {
        value: 305,
        currency: 'EUR',
      },
      membersBalance: [
        {
          member: {
            id: 1,
            name: 'Joan Morató',
          },
          totalTransactions: {
            value: 125,
            currency: 'EUR',
          },
          balance: {
            value: 23.33333333333333,
            currency: 'EUR',
          },
        },
        {
          member: {
            id: 2,
            name: 'Francisco Buyo',
          },
          totalTransactions: {
            value: 180,
            currency: 'EUR',
          },
          balance: {
            value: 78.33333333333333,
            currency: 'EUR',
          },
        },
        {
          member: {
            id: 3,
            name: 'Alfonso Pérez',
          },
          totalTransactions: {
            value: 0,
            currency: 'EUR',
          },
          balance: {
            value: -101.66666666666667,
            currency: 'EUR',
          },
        },
      ],
    },
  };
}
