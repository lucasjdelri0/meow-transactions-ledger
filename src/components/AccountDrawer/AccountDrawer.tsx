/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Divider, Drawer, Typography } from 'antd'
import { useTransactionsContext } from 'providers/TransactionsProvider'
import { AccountDrawerProps } from './AccountDrawer.props'

const { Text } = Typography

export const AccountDrawer = ({
  open,
  account,
  onClose,
}: AccountDrawerProps): JSX.Element => {
  const { categories, transactions } = useTransactionsContext()
  const emptyState = 'No transactions yet'
  const accountTransactions = transactions?.filter(
    ({ origin, destination }) =>
      origin === account?.id || destination === account?.id
  )
  const sorted = accountTransactions.sort((a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)
    return bDate.getTime() - aDate.getTime()
  })

  return (
    <Drawer
      title={`${account?.title} Transactions`}
      placement='right'
      open={open}
      onClose={onClose}
    >
      {sorted.length
        ? sorted.map(({ id, origin, destination, amount, date }) => {
            const isIncome = destination === account?.id
            const involvedCategory = categories.find(
              ({ id }) => id === (isIncome ? origin : destination)
            )
            return (
              <div key={id}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text>
                    {`${isIncome ? 'From' : 'To'}: `}{' '}
                    <Text strong>{involvedCategory?.title}</Text>
                  </Text>
                  <Text type={isIncome ? 'success' : 'danger'} strong>{`${
                    isIncome ? '+' : '-'
                  } $${amount.toLocaleString()}`}</Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Text italic>{isIncome ? 'Received' : 'Sent'}</Text>
                  <Text>{date}</Text>
                </div>
                <Divider />
              </div>
            )
          })
        : emptyState}
    </Drawer>
  )
}
