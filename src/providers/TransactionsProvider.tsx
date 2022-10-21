import { createContext, ReactNode, useContext, useEffect } from 'react'
import {
  Category,
  Transaction,
  initialCategories,
  initialTransactions,
} from 'utils/categories'

interface TransactionsContextType {
  categories: Category[]
  transactions: Transaction[]
}

const TransactionsContext = createContext<TransactionsContextType>({
  categories: initialCategories,
  transactions: initialTransactions,
})

interface ProviderProps {
  children?: ReactNode
}

const getLocalCategories = (): Category[] => {
  const localData = localStorage.getItem('categories')
  return localData ? (JSON.parse(localData) as Category[]) : []
}

const getLocalTransactions = (): Transaction[] => {
  const localData = localStorage.getItem('transactions')
  return localData ? (JSON.parse(localData) as Transaction[]) : []
}

const TransactionsProvider = ({ children }: ProviderProps): JSX.Element => {
  const categories = getLocalCategories()
  const transactions = getLocalTransactions()

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(initialCategories))
    localStorage.setItem('transactions', JSON.stringify(initialTransactions))
  }, [])

  // useEffect(() => {
  //   localStorage.setItem('categories', JSON.stringify(categories))
  //   // setCategories(categories)
  // }, [categories])

  // useEffect(() => {
  //   localStorage.setItem('transactions', JSON.stringify(transactions))
  //   // setTransactions(transactions)
  // }, [transactions])

  const value = {
    categories,
    transactions,
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
