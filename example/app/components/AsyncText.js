import React from 'react'
import { Outer, Container } from 'Components/Layout'
import { hydrate } from 'react-hydrate'

class AsyncText extends React.Component {
  render () {
    const { loading, description } = this.props
    return (
      <div className="mt2">
        <p>{loading ? 'Loading text...' : description}</p>
      </div>
    )
  }
}

export default hydrate(
  props => new Promise(( resolve, reject ) => {
    setTimeout(() => {
      resolve({
        copy: {
          async: `You probably haven't heard of them jianbing fingerstache, hot chicken flannel palo santo cred chartreuse bicycle rights.`
        }
      })
    }, 1000)
  }),
  state => {
    return {
      description: state.copy.async
    }
  }
)(AsyncText)
