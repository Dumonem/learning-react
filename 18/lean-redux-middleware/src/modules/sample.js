import * as api from '../lib/api';
import { handleActions } from 'redux-actions';
import CreateRequestThunk from '../lib/createRequestThunk';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from '../lib/createRequestSaga';

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';

export const getPost = CreateRequestThunk(GET_POST, api.getPost);

export const getUsers = CreateRequestThunk(GET_USERS, api.getUsers);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);

const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga() {
	yield takeLatest(GET_POST, getPostSaga);
	yield takeLatest(GET_USERS, getUsersSaga);
}

const initialState = {
	post: null,
	users: null,
};

const sample = handleActions(
	{
		[GET_POST_SUCCESS]: (state, action) => ({
			...state,
			loading: {
				GET_POST: false, //요청완료
			},
			post: action.payload,
		}),
		[GET_USERS_SUCCESS]: (state, action) => ({
			...state,
			loading: {
				...state.loading,
				GET_USERS: false, //요청완료
			},
			users: action.payload,
		}),
	},
	initialState
);

export default sample;
