import { Breadcrumb, Layout as AntLayout } from 'antd'
import { BellOutlined, HomeOutlined } from '@ant-design/icons'
import Header from 'layout/Primary/Header'
import './Primary.css'

const { Content, Footer } = AntLayout

export const Primary = ({
  children,
}: {
  children: JSX.Element
}): JSX.Element => (
  <AntLayout style={{ minHeight: '100vh', minWidth: '100vw' }}>
    <Header
      repoHref='https://github.com/lucasjdelri0/meow-transactions-ledger'
      avatarImageSrc='https://joeschmoe.io/api/v1/joe'
      badgeCount={7}
      badgeIcon={<BellOutlined />}
      backgroundColor='white'
    />
    <Content
      className='site-layout'
      style={{ padding: '0 48px', display: 'flex', flexDirection: 'column' }}
    >
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <HomeOutlined /> Home
        </Breadcrumb.Item>
      </Breadcrumb>
      {children}
    </Content>
    <Footer style={{ textAlign: 'center' }}>Meow Challenge (2022)</Footer>
  </AntLayout>
)
