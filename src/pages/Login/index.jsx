import React, { useState, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import moment from 'moment'
import { actions } from '@/store/user'
import './index.less'

const key = 'updatable'

const Login = ({ onSubmitForm }) => {
  const [logining, setLogining] = useState(false)
  const history = useHistory()
  const { search } = useLocation()
  const [form] = Form.useForm()
  const loginForm = {
    username: '',
    password: '',
    remember: true,
  }

  const redirect = useMemo(() => {
    let ans = '/admin'
    if (!search) return ans
    const arr = search.slice(1).split('&')
    arr.forEach((item) => {
      const [key, value] = item.split('=')
      if (key === 'redirect') {
        ans = value
        return
      }
    })
    return ans
  }, [search])

  const handleSubmitForm = async (form) => {
    return new Promise((resolve, reject) => {
      setLogining(true)
      message.loading({ content: 'Login...', key, duration: 0 })
      onSubmitForm({ form, resolve, reject })
    })
  }

  const onFinish = (fieldsValue) => {
    Object.keys(fieldsValue).forEach((key) => {
      if (fieldsValue[key] instanceof moment) {
        fieldsValue[key] = fieldsValue[key].format('YYYY-MM-DD HH:mm:ss')
      }
    })

    handleSubmitForm(fieldsValue)
      .then(() => {
        message.success({ content: 'login success', key })
        setTimeout(() => {
          history.push(redirect)
        })
      })
      .finally(() => {
        setLogining(false)
      })
  }

  return (
    <div className={`login-layout`}>
      <header className="login-layout__header"></header>
      <main className="login-layout__main">
        <section className="login-layout__main-top"></section>
        <section className="login-layout__main-bottom">
          <Form
            name="normal_login"
            className="login-form"
            form={form}
            initialValues={loginForm}
            onFinish={onFinish}
            size="large">
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={logining} className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </main>
      <footer className="login-layout__footer"></footer>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isLogin: !!state.user.accessToken,
})
const mapDispatchToProps = (dispatch) => ({
  onSubmitForm: (payload) => dispatch(actions.login(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
