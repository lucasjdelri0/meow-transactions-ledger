import { Avatar, List } from 'antd'
import { categoryIcons } from 'utils/categories'
import { AccountListProps } from './AccountList.props'

export const AccountList = ({
  accounts,
  onAction,
}: AccountListProps): JSX.Element => (
  <List
    dataSource={accounts}
    bordered
    renderItem={({ id, title, balance }) => {
      const category = categoryIcons.find(
        ({ id: categoryId }) => categoryId === id
      )
      return (
        <List.Item
          key={id}
          actions={[
            <a onClick={() => onAction({ id, title, balance })} key={`a-${id}`}>
              View Details
            </a>,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                icon={category?.icon}
                style={{ backgroundColor: category?.backgroundColor }}
              />
            }
            title={title}
            description={`Balance: $${balance.toLocaleString()}`}
          />
        </List.Item>
      )
    }}
    style={{ width: '100%' }}
  />
)
