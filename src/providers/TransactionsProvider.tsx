import { createContext, ReactNode, useContext, useState } from 'react'
import {
  Category,
  Transaction,
  initialCategories,
  initialTransactions,
} from 'utils/categories'

interface TransactionsContextType {
  categories: Category[]
  transactions: Transaction[]
  setCategories: (categories: Category[]) => void
  setTransactions: (transactions: Transaction[]) => void
}

const getLocalCategories = (): Category[] => {
  const localData = localStorage.getItem('categories')
  return localData ? (JSON.parse(localData) as Category[]) : initialCategories
}

const getLocalTransactions = (): Transaction[] => {
  const localData = localStorage.getItem('transactions')
  return localData
    ? (JSON.parse(localData) as Transaction[])
    : initialTransactions
}

const TransactionsContext = createContext<TransactionsContextType>({
  categories: getLocalCategories(),
  transactions: getLocalTransactions(),
  setCategories: () => {},
  setTransactions: () => {},
})

interface ProviderProps {
  children?: ReactNode
}

const TransactionsProvider = ({ children }: ProviderProps): JSX.Element => {
  const [categories, setCategories] = useState(getLocalCategories)
  const [transactions, setTransactions] = useState(getLocalTransactions)

  const value = {
    categories,
    transactions,
    setTransactions,
    setCategories,
  }
  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactionsContext = (): TransactionsContextType =>
  useContext(TransactionsContext)

export default TransactionsProvider
