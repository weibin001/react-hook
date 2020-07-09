import React, { lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
function getRouteElement({ route, index, opts }) {
  if (!route) return null
  const routeProps = {
    key: route.key || index,
    exact: 'exact' in route ? route.exact : true,
    strict: route.strict,
    sensitive: 'sensitive' in route ? route.sensitive : true,
    path: route.path,
    ...opts,
  }
  if (route.redirect) return <Redirect {...routeProps} from={route.path} to={route.redirect} />
  const PageComponent = route.component
    ? typeof route.component === 'string'
      ? lazy(() => import(/* webpackChunkName: '[request]' */ /* webpackPrefetch: true */ `@/pages/${route.component}`))
      : route.component
    : null
  // return <PageComponent></PageComponent>
  return <Route {...routeProps} render={(props) => <PageComponent {...props} routes={route.children} />} />
}

export const renderRoutes = (routes, extraProps = {}, switchProps = {}) =>
  routes ? (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Switch {...switchProps}>
        {routes.reduce((prev, route, index) => {
          if (!route.component && !route.redirect) {
            return route.children && route.children?.length > 0
              ? [
                  ...prev,
                  ...route.children.map((childRoute, index) =>
                    getRouteElement({ route: childRoute, index, extraProps })
                  ),
                ]
              : prev
          }
          // return route?.children && route?.children?.length > 0
          //   ? [
          //       ...prev,
          //       ...route.children.map((childRoute, index) => getRouteElement({ childRoute, index, extraProps })),
          //     ]
          //   : prev
          return [...prev, getRouteElement({ route, index, extraProps })]
        }, [])}
      </Switch>
    </React.Suspense>
  ) : null

