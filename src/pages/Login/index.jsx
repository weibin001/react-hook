import React from 'react'
import { useHistory } from 'react-router-dom'
const Login = () => {
  const history = useHistory()
  return <div onClick={() => history.push('/article/list')}>login</div>
}

export default Login
