import { Layout, Space, Menu, Badge, Button, Avatar, Typography } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { HeaderProps } from './Header.props'
import './Header.css'

const { Header: AntHeader } = Layout
const { Link: AntLink } = Typography

export const Header = ({
  avatarImageSrc,
  backgroundColor,
  repoHref,
  routes,
  selectedKeys,
  tabColor,
  badgeCount,
  badgeIcon,
}: HeaderProps): JSX.Element => (
  <AntHeader className='headerContainer' style={{ backgroundColor }}>
    {repoHref && (
      <AntLink href={repoHref} target='_blank' className='ghLink'>
        <GithubOutlined className='headerLogo' />
      </AntLink>
    )}

    {routes && (
      <Menu
        mode='horizontal'
        selectedKeys={selectedKeys}
        className='routesMenu'
        style={{
          backgroundColor,
        }}
      >
        {routes.map(({ path, title }) => (
          <Menu.Item key={path}>
            <AntLink href={path} style={{ color: tabColor }}>
              {title}
            </AntLink>
          </Menu.Item>
        ))}
      </Menu>
    )}

    <Space align='center'>
      {badgeIcon && (
        <Badge count={badgeCount}>
          <Button icon={badgeIcon} shape='circle' size='small' type='link' />
        </Badge>
      )}
      {avatarImageSrc && <Avatar src={avatarImageSrc} />}
    </Space>
  </AntHeader>
)
