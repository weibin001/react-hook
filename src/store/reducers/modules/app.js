const initState = {
  language: '',
  device: 'desktop',
  sidebar: false,
}

const reducers = (state = initState, actions) => {
  switch (actions.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebar: !state.sidebar }
    case 'CLOSE_SIDEBAR':
      return { ...state, sidebar: true }
    default:
      return state
  }
}

export default reducers
