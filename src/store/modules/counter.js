import produce from 'immer';
import { put, takeEvery, delay } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';

const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const INCREMENT_ASYNC = 'counter/INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'counter/DECREMENT_ASYNC';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const incrementAsync = createAction(INCREMENT_ASYNC);
export const decrementAsync = createAction(DECREMENT_ASYNC);

const initialState = {
  value: 1,
};

function* incrementAsyncSaga() {
  yield delay(1000);
  console.log('증가');
  yield put(increment()); // put: 액션을 스토어로 디스패치한다.
}

function* decrementAsyncSaga() {
  yield delay(1000);
  console.log('감소');
  yield put(decrement());
}

export function* counterSaga() {
  // takeEvery: 특정 액션을 모니터링하고, 발생하면 특정 함수를 발생시킨다.
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
  yield takeEvery(DECREMENT_ASYNC, decrementAsyncSaga);
}

export default handleActions(
  {
    [INCREMENT]: (state, action) =>
      produce(state, draft => {
        draft.value = draft.value + 1;
      }),
    [DECREMENT]: (state, action) =>
      produce(state, draft => {
        draft.value = draft.value - 1;
      }),
  },
  initialState,
);
