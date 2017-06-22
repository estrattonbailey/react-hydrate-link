# react-hydrate-link
An extension for react-router v4 projects that prefetches data for the next view before completing navigation. Requires [react-hydrate](https://github.com/estrattonbailey/react-hydrate).

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Purpose
Skeleton UI is great, but sometimes you need to wait to render a new view until all your data is available. react-router v4 made this slightly harder, as you can see [in this issue thread](https://github.com/ReactTraining/react-router/issues/4407#issuecomment-281819336). This library attempts to merge the co-located data (with `react-hydrate`, in this case) *and* the awesome dynamic routing we have with RRv4.

## Usage
Assumming a `react-hydrate` setup consistent with that outlined in that library's README, when clicking the `Link` to the About page, the actual navigation will not occur until the data has resolved within the `hydrate()` connector that wraps the `About` component.
```javascript
import Link from 'react-hydrate-link'

/**
 * About.js
 */
import { hydrate } from 'react-hydrate'

export default hydrate(
  props => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        about: 'This is the about page. This data was loaded asynchronously.'
      })
    }, 1000)
  }),
  state => ({
    description: state.about
  })
)(({ loading, description }) => (
  <div>
    <h1>About</h1>
    <p>{loading ? 'Loading description...' : description}
  </div>
))

/**
 * Home.js
 */
export default props => (
  <div>
    <h1>Home</h1>
    <p>This is the home page. This data was loaded synchronously.</p>
  </div>
)

/**
 * index.js
 */
export default props => (
  <nav>
    <Link to="/home">Home</Link>
    <Link to="/about">About</Link>

    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
  </nav>
)
```

MIT License

