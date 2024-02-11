import { Transaction } from '../domain/models/transaction.model';
import { Member } from '../domain/models/member.model';

type AppInitialData = {
  members: Member[];
  transactions: Transaction[];
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
  };
}
