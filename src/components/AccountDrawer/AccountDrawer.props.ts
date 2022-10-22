import { Category } from 'utils/categories'

export interface AccountDrawerProps {
  open: boolean
  account?: Category
  onClose: () => void
}
