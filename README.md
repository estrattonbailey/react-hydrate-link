# react-hydrate-link
A companion to [react-hydrate](https://github.com/estrattonbailey/react-hydrate) and extension of [react-router](https://github.com/ReactTraining/react-router) that prefetches data dependencies for the next route, given a `react-router` context.

In a nutshell, this library, together with `react-hydrate`, ensures that all data has loaded *before* rendering the next route. No flashing loading state needed.

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Usage
First, you'll need `react-hydrate`. Check out that [README](https://github.com/estrattonbailey/react-hydrate) for more info.

Then, just import the default export from `react-hydrate-link` and use in place of the `Link` export from `react-router`.

```javascript
// instead of this
import { Link } from 'react-router-dom'

// use this
import Link from 'react-hydrate-link'
```

That's it!

## How it works
`react-hydrate` basically lifts data dependencies outside of your React app, resolves them asynchronously, and injects the data back in for you to handle as you will. What this library does is run a quick *blind render* over the next route's AST to cache your data in memory before navigation. That way, the next route loads immediately.

In the example below, when clicking the `Link` to the About page, the actual navigation will not occur until the data has resolved within the `hydrate()` connector that wraps the `About` component.
```javascript
import Link from 'react-hydrate-link'

/**
 * About.js
 */
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
 * index.js
 */
import Link from 'react-hydrate-link'

export default props => (
  <nav>
    <Link to="/about">About</Link>

    <Route path='/about' component={About} />
  </nav>
)
```

MIT License
