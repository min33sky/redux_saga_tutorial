import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import post, { postSaga } from './post';
import { all } from 'redux-saga/effects';

// 여러개의 saga를 합친다.
export function* rootSaga() {
  yield all([counterSaga(), postSaga()]);
}

export default combineReducers({
  counter,
  post,
});
