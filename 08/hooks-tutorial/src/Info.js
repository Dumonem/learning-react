import React, { useEffect, useReducer } from 'react';

function reducer(state, action) {
	return {
		...state,
		[action.name]: action.value,
	};
}

const Info = () => {
	const [state, dispatch] = useReducer(reducer, {
		name: '',
		nickname: '',
	});
	const { name, nickname } = state;

	useEffect(() => {
		console.log('effect');
		return () => {
			console.log('unmount');
		};
	}, []);

	const onChangeName = (e) => {
		dispatch(e.target);
	};

	const onChangeNickname = (e) => {
		dispatch(e.target);
	};

	return (
		<div>
			<div>
				<input name="name" value={name} onChange={onChangeName} />
				<input name="nickname" value={nickname} onChange={onChangeNickname} />
			</div>
			<div>
				<div>
					<b>이름:</b>
					{name}
				</div>
				<div>
					<b>닉네임:</b>
					{nickname}
				</div>
			</div>
		</div>
	);
};

export default Info;
