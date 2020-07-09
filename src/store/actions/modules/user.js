export const login = (value) => ({ type: 'SET_TOKEN', ...value })
export const logOut = () => ({ type: 'REMOVE_TOKEN' })
