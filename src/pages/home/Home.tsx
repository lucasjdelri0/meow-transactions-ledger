import { useState } from 'react'
import {
  Avatar,
  Button,
  Dropdown,
  Input,
  List,
  Menu,
  MenuProps,
  Modal,
  Typography,
} from 'antd'
import { DownOutlined, SwapOutlined } from '@ant-design/icons'
import Page from 'components/Page'
import { useTransactionsContext } from 'providers/TransactionsProvider'
import './Home.css'

const { Title, Text, Paragraph } = Typography

export const Home = (): JSX.Element => {
  const [amount, setAmount] = useState('0')
  const [fromLabel, setFromLabel] = useState('From')
  const [toLabel, setToLabel] = useState('To')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { categories } = useTransactionsContext()

  const options = categories.map(({ id, title }) => {
    return { key: id, label: title }
  })
  const sortedOptions = options.sort((a, b) => a.label.localeCompare(b.label))
  console.log('sortedOptions')
  console.log(sortedOptions)

  const sorted = categories.sort((a, b) => b.balance - a.balance)

  const totalBalance = categories.reduce((total, { balance }) => {
    total += balance
    return total
  }, 0)

  const handleChange = (value: string): void => {
    setAmount(value)
  }

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleTransfer = (): void => {
    const categoryFrom = categories.find(({ title }) => title === fromLabel)
    const categoryTo = categories.find(({ title }) => title === toLabel)
    if (categoryFrom && categoryTo) {
      categoryFrom.balance -= parseInt(amount)
      categoryTo.balance += parseInt(amount)
      const otherCategories = categories.filter(
        ({ title }) => title !== fromLabel && title !== toLabel
      )
      const updatedCategories = [...otherCategories, categoryFrom, categoryTo]
      localStorage.setItem('categories', JSON.stringify(updatedCategories))
    }
    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  const handleFromSelect: MenuProps['onClick'] = ({ key }) => {
    const selected = categories.find(({ id }) => id === parseInt(key))
    if (selected) setFromLabel(selected.title)
  }

  const handleToSelect: MenuProps['onClick'] = ({ key }) => {
    const selected = categories.find(({ id }) => id === parseInt(key))
    if (selected) setToLabel(selected.title)
  }

  const fromMenu = (
    <Menu selectable onClick={handleFromSelect} items={sortedOptions} />
  )

  const toMenu = (
    <Menu selectable onClick={handleToSelect} items={sortedOptions} />
  )

  return (
    <Page>
      <Title level={2}>My Accounts</Title>
      <Paragraph style={{ textAlign: 'justify' }}>
        Check your accounts, keep track of their balance, and transfer money
        between them.
      </Paragraph>
      <Title
        level={4}
      >{`Total Balance: $ ${totalBalance.toLocaleString()}`}</Title>
      <List
        dataSource={sorted}
        bordered
        renderItem={({ id, title, balance }) => (
          <List.Item key={id}>
            <List.Item.Meta
              avatar={
                <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' />
              }
              title={<a href='https://ant.design/index-cn'>{title}</a>}
              description={`Balance: $${balance}`}
            />
          </List.Item>
        )}
        style={{ width: '100%' }}
      />
      <Button
        type='primary'
        icon={<SwapOutlined />}
        onClick={showModal}
        style={{ marginTop: '16px', padding: '0 32px' }}
      >
        Transfer
      </Button>
      <Modal
        title='Transfer Funds'
        open={isModalOpen}
        onOk={handleTransfer}
        onCancel={handleCancel}
        style={{ alignItems: 'center' }}
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
    </Page>
  )
}
