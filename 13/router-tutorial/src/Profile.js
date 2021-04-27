import React from 'react';

const data = {
	velopert: {
		name: '김민준',
		description: '리액트 개발자',
	},
	gildong: {
		name: '홍길동',
		description: '홍길동전 주인공',
	},
};

const Profile = ({ match }) => {
	const { username } = match.params;
	const profile = data[username];
	if (!profile) {
		return <di>존재하지 않는 사용자 입니다.</di>;
	}

	return (
		<div>
			<h3>
				{username}({profile.name})
			</h3>
			<p>{profile.description}</p>
		</div>
	);
};

export default Profile;
