import { useState } from 'react'
import { Dropdown, Input, Modal, Typography } from 'antd'
import { DownOutlined, SwapOutlined } from '@ant-design/icons'
import { TransferModalProps } from './TransferModal.props'

const { Text } = Typography

export const TransferModal = ({
  open,
  fromLabel,
  fromMenu,
  toLabel,
  toMenu,
  disabled,
  onTransfer,
  onCancel,
}: TransferModalProps): JSX.Element => {
  const [amount, setAmount] = useState('0')

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
      okButtonProps={{ disabled }}
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
          suffix='USD'
          style={{ maxWidth: '150px' }}
          value={amount}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </Modal>
  )
}
