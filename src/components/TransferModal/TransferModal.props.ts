export interface TransferModalProps {
  open: boolean
  fromLabel: string
  fromMenu: JSX.Element
  toLabel: string
  toMenu: JSX.Element
  disabled: boolean
  onTransfer: (amount: string) => void
  onCancel: () => void
}
