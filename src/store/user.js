import { call, put, takeLatest, fork, select, take, cancel } from 'redux-saga/effects'
import { login } from '@/api/user'

const mockUserInfo = {
  name: 'admin',
}

export const type = {
  GET_TOKEN: 'GET_TOKEN',
  SET_TOKEN: 'SET_TOKEN',
  REMOVE_TOKEN: 'REMOVE_TOKEN',
  GET_USERINFO: 'GET_USERINFO',
  SET_USERINFO: 'SET_USERINFO',
  REMOVE_USERINFO: 'REMOVE_USERINFO',
}

const initState = {
  userInfo: null,
  accessToken: '',
  refreshToken: '',
}

export const reducers = (state = initState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      }
    case 'REMOVE_TOKEN':
      return initState
    case 'SET_USERINFO':
      return {
        ...state,
        userInfo: action.data,
      }
    default:
      return state
  }
}

export const actions = {
  login: (value) => ({ type: 'GET_TOKEN_LOGIN', ...value }),
  setToken: (value) => ({ type: 'SET_TOKEN', value }),
  logOut: () => ({ type: 'REMOVE_TOKEN' }),
  setUserInfo: (data) => ({ type: 'SET_USERINFO', data }),
}

function delay(time, result) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(result)
    }, time)
  )
}

function* authrize(form) {
  try {
    const data = yield call(login, form)
    yield put({ type: 'SET_TOKEN', data })
    return data
  } catch (e) {
    console.error(e)
  }
}

function* loginByPassword({ form, reject, resolve }) {
  try {
    yield call(authrize, form)
    yield call(getUserInfo)
    resolve()
  } catch (error) {
    reject(error)
  }
}

function* getUserInfo() {
  try {
    const userInfo = yield call(delay, 1000, mockUserInfo)
    if (userInfo) {
      yield put({ type: 'SET_USERINFO', data: userInfo })
      return userInfo
    }
  } catch (e) {
    console.error(e)
  }
}

function* updateToken() {
  try {
    const data = yield call(delay, 1000, { accessToken: Date.now(), refreshToken: 'token' })
    yield put({ type: 'SET_TOKEN', data })
    return data
  } catch (e) {
    console.error(e)
  }
}

function* watchTokenUpdate() {
  yield takeLatest('GET_TOKEN_UPDATE', updateToken)
}

function* watchUserUpdate() {
  yield takeLatest('GET_USER_UPDATE', getUserInfo)
}

function* watchUserSaga() {
  while (true) {
    let accessToken = yield select((state) => state.user.accessToken)
    if (!accessToken) {
      const { form, reject, resolve } = yield take('GET_TOKEN_LOGIN')
      yield fork(loginByPassword, { form, reject, resolve })
    }
    const tokenUpdateTask = yield fork(watchTokenUpdate)
    const userUpdateTask = yield fork(watchUserUpdate)
    yield take('LOGIN_OUT')
    tokenUpdateTask && (yield cancel(tokenUpdateTask))
    userUpdateTask && (yield cancel(userUpdateTask))
    yield put({ type: 'REMOVE_TOKEN' })
  }
}

export default function* rootSaga() {
  yield watchUserSaga()
}
