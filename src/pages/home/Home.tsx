import { useState } from 'react'
import {
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Input,
  List,
  Menu,
  MenuProps,
  Modal,
  Typography,
} from 'antd'
import { DownOutlined, PlusOutlined, SwapOutlined } from '@ant-design/icons'
import Page from 'components/Page'
import { useTransactionsContext } from 'providers/TransactionsProvider'
import './Home.css'

const { Title, Text, Paragraph } = Typography

export const Home = (): JSX.Element => {
  const [fromLabel, setFromLabel] = useState('From')
  const [toLabel, setToLabel] = useState('To')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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

  const showDrawer = (): void => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = (): void => {
    setIsDrawerOpen(false)
  }

  const showModal = (): void => {
    setIsModalOpen(true)
  }

  const handleTransfer = (): void => {
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
      <div style={{ marginTop: '8px' }}>
        <Button
          type='primary'
          icon={<SwapOutlined />}
          onClick={showModal}
          style={{ margin: 8 }}
        >
          Transfer
        </Button>
        <Button type='primary' icon={<PlusOutlined />} style={{ margin: 8 }}>
          Add Category
        </Button>
      </div>
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
          <Input suffix='USD' style={{ maxWidth: '150px' }} />
        </div>
      </Modal>
      <Drawer
        width={640}
        placement='right'
        closable={false}
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        Holis
      </Drawer>
    </Page>
  )
}
