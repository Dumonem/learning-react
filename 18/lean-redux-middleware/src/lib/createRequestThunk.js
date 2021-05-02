import { startLoading, finishLoading } from '../modules/loading';

export default function CreateRequestThunk(type, request) {
	const SUCCESS = `${type}_SUCCESS`;
	const FAILURE = `${type}_FAILURE`;
	return (params) => async (dispatch) => {
		dispatch({ type }); //시작
		dispatch(startLoading(type));
		try {
			const response = await request(params);
			dispatch({
				type: SUCCESS,
				payload: response.data,
			}); //성공
			dispatch(finishLoading(type));
		} catch (e) {
			dispatch({
				type: FAILURE,
				payload: e,
				error: true,
			});
			dispatch(finishLoading(type));
			throw e;
		}
	};
}
