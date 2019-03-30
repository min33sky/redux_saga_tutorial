import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import produce from 'immer';
import { call, put, takeEvery } from 'redux-saga/effects';

function getPostAPI(postId) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';

export const getPost = createAction(GET_POST, postId => postId);

const initialState = {
  data: {
    title: '',
    body: '',
  },
};

const something = () => ({
  data: {
    title: 'hello',
    body: 'world',
  },
});

function* getPostSaga(action) {
  // call: 첫번째 파라미터로 전달한 함수에 그 뒤에 있는 파라미터들을 전달하여 호출
  // 이를 사용하면 나중에 테스트를 작성하게 될 때 용이하다.
  console.log(call(something, ''));

  try {
    const response = yield call(getPostAPI, action.payload);
    console.log(response);
    yield put({ type: GET_POST_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: GET_POST_FAILURE, payload: error });
  }
}

export function* postSaga() {
  yield takeEvery(GET_POST, getPostSaga);
}

export default handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) =>
      produce(state, draft => {
        const { title, body } = action.payload.data;
        draft.data.title = title;
        draft.data.body = body;
      }),
  },
  initialState,
);
