import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { StaticRouter } from 'react-router'
import { Tap } from 'react-hydrate'
import { asyncRender } from 'react-hydrate/dist/server'

export default class AsyncLink extends Link {
  static contextTypes = {
    hydrate: PropTypes.shape({
      store: PropTypes.shape({
        getState: PropTypes.func.isRequired
      }),
      root: PropTypes.object.isRequired,
      hydrateStore: PropTypes.func.isRequired
    }).isRequired,
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
        replace: PropTypes.func.isRequired,
        createHref: PropTypes.func.isRequired
      }).isRequired,
      route: PropTypes.object
    }).isRequired
  }

  prefetch (href) {
    const { hydrate, router } = this.context
    const { store, root: Root, hydrateStore } = hydrate
    let { pathname: mutatedPathname } = router.route.location.pathname // eslint-disable-line no-unused-vars

    const ctx = {}

    mutatedPathname = href

    return asyncRender((
      <StaticRouter location={href} context={ctx}>
        <Tap hydrate={store}>
          {Root}
        </Tap>
      </StaticRouter>
    )).then(() => {
      if (ctx.url) {
        return this.prefetch(ctx.url)
      }

      return hydrateStore(store.getState())
    })
  }

  render () {
    const { replace, to, root, ...props } = this.props // eslint-disable-line no-unused-vars

    const href = this.context.router.history.createHref(
      typeof to === 'string' ? { pathname: to } : to
    )

    return <a {...props} onClick={e => {
      e.preventDefault()
      e.persist()
      e.defaultPrevented = false

      this.prefetch(href).then(() => {
        this.handleClick(e)
      })
    }} href={href} />
  }
}
