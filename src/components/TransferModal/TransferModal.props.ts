import { Category } from 'utils/categories'

export interface TransferModalProps {
  open: boolean
  fromLabel: string
  fromMenu: JSX.Element
  fromCategory: Category
  toLabel: string
  toMenu: JSX.Element
  disabled: boolean
  onTransfer: (amount: string) => void
  onCancel: () => void
}
