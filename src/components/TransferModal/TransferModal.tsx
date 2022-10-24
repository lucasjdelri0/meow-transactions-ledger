import { useState } from 'react'
import { Dropdown, Input, Modal, Typography } from 'antd'
import { DownOutlined, SwapOutlined } from '@ant-design/icons'
import { useTransactionsContext } from 'providers/TransactionsProvider'
import { TransferModalProps } from './TransferModal.props'

const { Text } = Typography

export const TransferModal = ({
  open,
  fromLabel,
  fromCategory,
  fromMenu,
  toLabel,
  toMenu,
  disabled,
  onTransfer,
  onCancel,
}: TransferModalProps): JSX.Element => {
  const [amount, setAmount] = useState('')

  const isOverBalance = parseInt(amount) > fromCategory.balance
  const isNegative = parseInt(amount) < 1

  const handleChange = (value: string): void => {
    setAmount(value)
  }

  return (
    <Modal
      title='Transfer Funds'
      open={open}
      onOk={() => onTransfer(amount)}
      onCancel={onCancel}
      style={{ alignItems: 'center' }}
      okButtonProps={{
        disabled: disabled || isOverBalance || isNegative,
      }}
    >
      <p>Transfer money between your accounts</p>
      <div>
        <Dropdown.Button overlay={fromMenu} icon={<DownOutlined />}>
          {fromLabel}
        </Dropdown.Button>
        <SwapOutlined style={{ margin: '0 12px' }} />
        <Dropdown.Button overlay={toMenu} icon={<DownOutlined />}>
          {toLabel}
        </Dropdown.Button>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Text style={{ marginRight: '8px' }}>Amount</Text>
        <Input
          type='number'
          value={amount}
          placeholder='$500'
          suffix='USD'
          onChange={(e) => handleChange(e.target.value)}
          required
          status={isOverBalance || isNegative ? 'error' : ''}
        />
      </div>
      {fromCategory.balance > 0 && (
        <Text
          strong
          italic
          style={{ marginRight: '8px', marginTop: '8px', fontSize: 12 }}
        >{`${fromCategory.title}: $${fromCategory.balance}`}</Text>
      )}
    </Modal>
  )
}
