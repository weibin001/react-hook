import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

function render({ route, opts, props }) {
  const routes = renderRoutes({
    ...opts,
    routes: route.routes || [],
    rootRoutes: opts.rootRoutes,
  })
  let { component: Component, wrappers } = route
  if (Component) {
    if (typeof Component === 'string') {
      const path = Component
      Component = dynamic({
        loader: async () => {
          const { default: component } = await import(
            /* webpackChunkName: '[request]' */ /* webpackPrefetch: true */ `@/pages/${path}`
          )
          return component
        },
      })
    }
    const defaultPageInitialProps = opts.isServer ? {} : window.g_initialProps
    const newProps = {
      ...props,
      ...opts.extraProps,
      ...(opts.pageInitialProps || defaultPageInitialProps),
      route,
      routes: opts.rootRoutes,
    }
    let ret = <Component {...newProps}>{routes}</Component>
    if (wrappers) {
      let len = wrappers.length - 1
      while (len >= 0) {
        ret = React.createElement(wrappers[len], newProps, ret)
        len--
      }
    }
    return ret
  } else {
    return routes
  }
}

function getRouteElement({ route, index, opts }) {
  const routeProps = {
    key: route.key || index,
    exact: !!route.exact,
    strict: !!route.strict,
    sensitive: !!route.sensitive,
    path: route.path,
  }
  if (route.redirect) {
    return <Redirect {...routeProps} from={route.path} to={route.redirect} />
  } else {
    return <Route {...routeProps} render={(props) => render({ route, opts, props })} />
  }
}

export function dynamic(opts) {
  const loadableFn = Loadable
  let loadableOptions = {
    loading: ({ error, isLoading }) => {
      if (process.env.NODE_ENV === 'development') {
        if (isLoading) {
          return <p>loading...</p>
        }
        if (error) {
          return (
            <p>
              {error.message}
              <br />
              {error.stack}
            </p>
          )
        }
      }
      return <p>loading...</p>
    },
  }
  if (typeof opts === 'function') {
    loadableOptions.loader = opts
    // Support for having first argument being options,
  } else if (typeof opts === 'object') {
    loadableOptions = { ...loadableOptions, ...opts }
  } else {
    throw new Error(`Unexpect arguments ${opts}`)
  }
  return loadableFn(loadableOptions)
}

export default function renderRoutes(opts) {
  return opts && opts.routes && opts.routes.length > 0 ? (
    <Switch {...opts.switchProps}>
      {opts.routes.map((route, index) =>
        getRouteElement({ route, index, opts: { ...opts, rootRoutes: opts.rootRoutes || opts.routes } })
      )}
    </Switch>
  ) : null
}
