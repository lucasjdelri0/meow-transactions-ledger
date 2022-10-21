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
        You will be able to keep track of your financial categories, check their
        balances, and even transfer money between them.
      </Paragraph>
      <div>
        <img alt='meow' src='images/meow.png' style={{ width: 300 }} />
      </div>
    </Page>
  </Primary>
)

export default App
