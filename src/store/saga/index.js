import { call, put } from 'redux-saga/effects'

const mockApi = (time) => new Promise((resolve) => setTimeout(() => resolve({ name: 'admin' }), time))

// function* getUserInfo() {
//   // console.log('Hello Sagas!')
//   const data = yield call(mockApi, 1000)
//   yield put('SET_USERINFO', data)
// }

export default function* userSaga() {
  while (true) {
    const action = yield call(mockApi, 1000)
    yield put('SET_USERINFO', action)
  }
}
