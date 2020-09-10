import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import renderRoutes from './utils/renderRoutes'
import { constantRoutes } from './router'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>{renderRoutes({ routes: constantRoutes })}</BrowserRouter>
      </Provider>
    )
  }
}

export default App
