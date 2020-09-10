import React, { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

function LoginWrapper(props) {
  const token = useSelector((state) => state.user.accessToken)
  const userInfo = useSelector((state) => state.user.userInfo)
  const query = useMemo(
    () =>
      props.location.pathname && props.location.pathname === '/admin' ? '' : `?redirect=${props.location.pathname}`,
    [props.location.pathname]
  )

  const dispatch = useDispatch()
  const authLogin = useCallback(() => dispatch({ type: 'GET_USER_UPDATE' }), [dispatch])

  if (userInfo) {
    return props.children
  } else if (token && !userInfo) {
    authLogin()
    return <h2 style={{ textAlign: 'center' }}>Login</h2>
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          search: query,
        }}
      />
    )
  }
}

export default withRouter(LoginWrapper)
