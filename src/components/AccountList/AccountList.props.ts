import { Category } from 'utils/categories'

export interface AccountListProps {
  accounts: Category[]
  onAction: (item: Category) => void
}
