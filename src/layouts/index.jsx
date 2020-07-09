import React, { useEffect, useMemo, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd'
// import { bindActionCreators } from 'redux'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
// import { toggleSidebar, closeSidebar } from '../store/actions/modules/app'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
} from '@ant-design/icons'
import { throttle } from '@/utils/utils'
import { renderRoutes } from '@/utils/renderRoutes'
import style from './index.less'

const { Header, Content, Sider } = Layout

const { SubMenu } = Menu

// const mapStateToProps = (state) => ({ sidebar: state.app.sidebar })
// const mapDispatchToProps = (dispatch) => ({
//   toggleSidebar: bindActionCreators(toggleSidebar, dispatch),
//   closeSidebar: bindActionCreators(closeSidebar, dispatch),
// })

const AppHeader = React.memo(() => {
  const sidebar = useSelector((state) => state.app.sidebar, shallowEqual)
  const dispatch = useDispatch()
  const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), [dispatch])
  const TagTrigger = useMemo(() => (sidebar ? MenuUnfoldOutlined : MenuFoldOutlined), [sidebar])
  return (
    <Header style={{ backgroundColor: '#fff', padding: '0 20px' }}>
      <TagTrigger
        className={style.trigger}
        onClick={(e) => {
          e.stopPropagation()
          toggleSidebar()
        }}
      />
    </Header>
  )
})

const BasicLayout = (props) => {
  const { routes } = props

  const history = useHistory()
  const sidebar = useSelector((state) => state.app.sidebar, shallowEqual)
  const dispatch = useDispatch()

  const closeSidebar = useCallback(() => dispatch({ type: 'CLOSE_SIDEBAR' }), [dispatch])

  useEffect(() => {
    const onResizeWindow = (e) => {
      const width = e.target.innerWidth
      width < 992 && closeSidebar()
    }
    const throttleResize = throttle(onResizeWindow, 300, { leading: true })
    window.addEventListener('resize', throttleResize)
    return () => window.removeEventListener('resize', throttleResize)
  }, [closeSidebar])

  return (
    <Layout className={style['app-layout']} style={{ minHeight: '100vh' }}>
      <Sider
        className={[style['app-layout-sider']]}
        width={240}
        collapsed={sidebar}
        collapsedWidth={64}
        trigger={null}
        collapsible
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}>
        <div className={[style.logo]} />
        <Menu theme="dark" mode="inline" style={{ width: '100%' }}>
          <SubMenu key="sub1" icon={<DesktopOutlined />} title="Navigation One">
            <Menu.Item key="1" onClick={() => history.push({ pathname: '/article/list' })}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" onClick={() => history.push({ pathname: '/article/1' })}>
              Option 2
            </Menu.Item>
            <Menu.Item key="3" onClick={() => history.push({ pathname: '/' })}>
              Option 3
            </Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<PieChartOutlined />} title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<FileOutlined />} title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="app-container" style={{ marginLeft: sidebar ? 64 : 240 }}>
        <AppHeader />
        {/* <Header style={{ backgroundColor: '#fff', padding: '0 20px' }}>
          <TagTrigger
            className={style.trigger}
            onClick={(e) => {
              e.stopPropagation()
              setCollapse(!collapse)
            }}
          />
        </Header> */}
        <Content>{renderRoutes(routes)}</Content>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
