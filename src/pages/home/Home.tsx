import { useState } from 'react'
import { Button, Menu, MenuProps, Typography } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import { useTransactionsContext } from 'providers/TransactionsProvider'
import Page from 'components/Page'
import AccountList from 'components/AccountList'
import TransferModal from 'components/TransferModal'
import AccountDrawer from 'components/AccountDrawer'
import { Category, Transaction } from 'utils/categories'
import './Home.css'

const { Title, Paragraph } = Typography

export const Home = (): JSX.Element => {
  const [activeAccount, setActiveAccount] = useState<Category>()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [fromLabel, setFromLabel] = useState('From')
  const [toLabel, setToLabel] = useState('To')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { categories, transactions, setCategories, setTransactions } =
    useTransactionsContext()

  const sortedCategories = categories.sort((a, b) => b.balance - a.balance)

  const totalBalance = categories.reduce((total, { balance }) => {
    total += balance
    return total
  }, 0)

  const optionsFrom = categories.map(({ id, title }) => {
    return { key: id, label: title, disabled: toLabel === title }
  })
  const sortedFrom = optionsFrom.sort((a, b) => a.label.localeCompare(b.label))

  const optionsTo = categories.map(({ id, title }) => {
    return { key: id, label: title, disabled: fromLabel === title }
  })
  const sortedTo = optionsTo.sort((a, b) => a.label.localeCompare(b.label))

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleTransfer = (amount: string): void => {
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
      setCategories(updatedCategories)

      const date = new Date()
      const tx: Transaction = {
        id: transactions.length + 1,
        origin: categoryFrom.id,
        destination: categoryTo.id,
        amount: parseInt(amount),
        date: date.toUTCString(),
      }
      const updatedTransactions = [...transactions, tx]
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions))
      setTransactions(updatedTransactions)
    }
    setIsModalOpen(false)
  }

  const handleCancel = (): void => {
    setIsModalOpen(false)
  }

  const showDrawer = (): void => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = (): void => {
    setIsDrawerOpen(false)
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
    <Menu selectable onClick={handleFromSelect} items={sortedFrom} />
  )

  const toMenu = <Menu selectable onClick={handleToSelect} items={sortedTo} />

  const handleAction = (account: Category): void => {
    setActiveAccount(account)
    showDrawer()
  }

  return (
    <Page>
      <Title level={2}>My Accounts</Title>
      <Paragraph style={{ textAlign: 'justify' }}>
        Check your accounts, keep track of their balance, and transfer money
        between them.
      </Paragraph>
      <Title
        level={4}
      >{`Total Balance: $${totalBalance.toLocaleString()}`}</Title>
      <AccountList accounts={sortedCategories} onAction={handleAction} />
      <AccountDrawer
        open={isDrawerOpen}
        account={activeAccount}
        onClose={closeDrawer}
      />
      <Button
        type='primary'
        icon={<SwapOutlined />}
        onClick={showModal}
        style={{ marginTop: '16px', padding: '0 32px' }}
      >
        Transfer
      </Button>
      <TransferModal
        open={isModalOpen}
        fromLabel={fromLabel}
        fromMenu={fromMenu}
        toLabel={toLabel}
        toMenu={toMenu}
        disabled={fromLabel === 'From' || toLabel === 'To'}
        onTransfer={handleTransfer}
        onCancel={handleCancel}
      />
    </Page>
  )
}
