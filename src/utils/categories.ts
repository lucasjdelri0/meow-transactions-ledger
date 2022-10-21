export interface Transaction {
  id: number
  origin: number
  destination: number
  amount: number
  date: string
}

export interface Category {
  id: number
  title: string
  balance: number
}

export const initialCategories: Category[] = [
  { id: 0, title: 'Checking Account', balance: 420 },
  { id: 1, title: 'Savings Account', balance: 1650 },
  { id: 2, title: 'Groceries', balance: 210 },
  { id: 3, title: 'Utilities', balance: 3420 },
  { id: 4, title: 'Restaurants', balance: 414 },
  { id: 5, title: 'Coffee', balance: 1875 },
]

export const initialTransactions: Transaction[] = [
  {
    id: 0,
    origin: 0,
    destination: 1,
    amount: 1600,
    date: '16/10/2022',
  },
  {
    id: 1,
    origin: 2,
    destination: 0,
    amount: 133,
    date: '19/2022',
  },
  {
    id: 2,
    origin: 2,
    destination: 1,
    amount: 220,
    date: '19/2022',
  },
  {
    id: 3,
    origin: 4,
    destination: 5,
    amount: 23222,
    date: '19/2022',
  },
]
