import { constantRoutes } from '@/router'
const initState = {
  routes: constantRoutes,
  dynamicRoutes: [],
}
const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_ROUTES':
      return {
        routes: [...action.routes, ...state.routes],
        dynamicRoutes: action.routes,
      }
    case 'RESET_ROUTES':
      return {
        routes: constantRoutes,
        dynamicRoutes: [],
      }
    default:
      return state
  }
}

export default reducer
