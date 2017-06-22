import React from 'react'
import { Outer, Container } from 'Components/Layout'
import { hydrate } from 'react-hydrate'
import AsyncText from 'Components/AsyncText'

class Home extends React.Component {
  render () {
    const { loading, description } = this.props
    return (
      <div>
        <h1>Home</h1>
        <p>{loading ? 'Loading description...' : description}</p>
      </div>
    )
  }
}

const HomeWithData = hydrate(
  (props, state) => new Promise(( resolve, reject ) => {
    setTimeout(() => {
      resolve({
        copy: {
          home: 'This is the home page. This data was loaded asynchronously.'
        }
      })
    }, 2000)
  }),
  state => {
    return {
      description: state.copy.home
    }
  }
)(Home)

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bool: true
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        bool: false
      })
    }, 2000)
  }

  render () {
    return (
      <Outer>
        <Container>
          <HomeWithData test={'test'} />
          <AsyncText someProp={this.state.bool} />
        </Container>
      </Outer>
    )
  }
}
