import { Button, Typography } from 'antd'
import Primary from './layout/Primary'
import Page from './components/Page'
import './App.css'

const { Title, Paragraph } = Typography
const App = (): JSX.Element => (
  <Primary>
    <Page>
      <Title level={2}>Meow Challenge</Title>
      <Paragraph>
        This solution is intended to solve the frontend challenge proposed by
        Meow.
      </Paragraph>
      <Paragraph>
        You will be able to see your financial categories, keep track of their
        balance, and even transfer money between them.
      </Paragraph>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        <Button type='primary' onClick={() => console.log('pressed')}>
          Transfer
        </Button>
      </div>
    </Page>
  </Primary>
)

export default App
