import React from 'react'
import { Outer, Container } from 'Components/Layout'
import { hydrate } from 'react-hydrate'

class About extends React.Component {
  render () {
    const { loading, description } = this.props
    return (
      <div>
        <h1>About</h1>
        <p>{loading ? 'Loading description...' : description}</p>
      </div>
    )
  }
}

const AboutWithData = hydrate(
  (props, state) => new Promise(( resolve, reject ) => {
    setTimeout(() => {
      resolve({
        copy: {
          about: 'This is the about page. This data was loaded asynchronously.'
        }
      })
    }, 1000)
  }),
  state => {
    return {
      description: state.copy.about
    }
  }
)(About)

export default props => (
  <Outer>
    <Container>
      <AboutWithData />
    </Container>
  </Outer>
)
