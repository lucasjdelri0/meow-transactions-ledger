import {
  CoffeeOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
  ToolOutlined,
} from '@ant-design/icons'

export interface Category {
  id: number
  title: string
  balance: number
}

export const initialCategories: Category[] = [
  { id: 0, title: 'Utilities', balance: 420 },
  { id: 1, title: 'Clothing', balance: 1650 },
  { id: 2, title: 'Health', balance: 210 },
  { id: 3, title: 'Services', balance: 3420 },
  { id: 4, title: 'Supermarket', balance: 414 },
  { id: 5, title: 'Coffee', balance: 1875 },
]

export const categoryIcons = [
  { id: 0, icon: <ToolOutlined />, backgroundColor: '#4C9900' },
  { id: 1, icon: <SkinOutlined />, backgroundColor: '#f56a00' },
  { id: 2, icon: <HeartOutlined />, backgroundColor: '#FF3333' },
  { id: 3, icon: <CustomerServiceOutlined />, backgroundColor: '#7265e6' },
  { id: 4, icon: <ShoppingCartOutlined />, backgroundColor: '#FF3399' },
  { id: 5, icon: <CoffeeOutlined />, backgroundColor: '#663300' },
]

export interface Transaction {
  id: number
  origin: number
  destination: number
  amount: number
  date: string
}

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    origin: 0,
    destination: 1,
    amount: 1600,
    date: 'Mon, 16 Oct 2022 16:29:24 GMT',
  },
  {
    id: 2,
    origin: 2,
    destination: 0,
    amount: 133,
    date: 'Thu, 8 Oct 2022 13:29:24 GMT',
  },
  {
    id: 3,
    origin: 2,
    destination: 1,
    amount: 220,
    date: 'Fri, 12 Oct 2022 09:29:24 GMT',
  },
  {
    id: 4,
    origin: 4,
    destination: 5,
    amount: 23222,
    date: 'Wed, 7 Oct 2022 21:29:24 GMT',
  },
]
