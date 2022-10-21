import { useState } from 'react'
import { Avatar, Button, Drawer, List, Typography } from 'antd'
import { PlusOutlined, SwapOutlined } from '@ant-design/icons'
import Page from 'components/Page'
import { useTransactionsContext } from 'providers/TransactionsProvider'

const { Title, Paragraph } = Typography

export const Home = (): JSX.Element => {
  const [open, setOpen] = useState(false)

  const { categories } = useTransactionsContext()

  const sorted = categories.sort((a, b) => b.balance - a.balance)

  const totalBalance = categories.reduce((total, { balance }) => {
    total += balance
    return total
  }, 0)

  const showDrawer = (): void => {
    setOpen(true)
  }

  const onClose = (): void => {
    setOpen(false)
  }

  return (
    <Page>
      <Title level={2}>Meow Challenge</Title>
      <Paragraph>
        This solution is intended to solve the frontend challenge proposed by
        Meow.
      </Paragraph>
      <Title level={3}>{`Total Balance: $${totalBalance}`}</Title>
      <List
        dataSource={sorted}
        bordered
        renderItem={({ id, title, balance }) => (
          <List.Item
            key={id}
            actions={[
              <a onClick={showDrawer} key={`a-${id}`}>
                View Detail
              </a>,
            ]}
          >
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
      <div>
        <Button type='primary' icon={<SwapOutlined />} style={{ margin: 8 }}>
          Transfer
        </Button>
        <Button type='primary' icon={<PlusOutlined />} style={{ margin: 8 }}>
          Add Category
        </Button>
      </div>
      <Drawer
        width={640}
        placement='right'
        closable={false}
        onClose={onClose}
        open={open}
      >
        Holis
      </Drawer>
    </Page>
  )
}
