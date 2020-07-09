const initState = {
  userInfo: null,
  accessToken: '',
  refreshToken: '',
}
const reducers = (state = initState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      }
    case 'REMOVE_TOKEN':
      return initState
    default:
      return state
  }
}

export default reducers
