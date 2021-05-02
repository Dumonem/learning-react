import React, { useEffect } from 'react';
import Sample from '../components/Sample';
import { connect } from 'react-redux';
import { getPost, getUsers } from '../modules/sample';

const SampleContainer = ({
	getPost,
	getUsers,
	post,
	users,
	loadingPost,
	loadingUsers,
}) => {
	useEffect(() => {
		const fn = async () => {
			try {
				await getPost(1);
				await getUsers();
			} catch (e) {
				console.log(e);
			}
		};

		fn().then();
	}, [getPost, getUsers]);
	return (
		<div>
			<Sample
				post={post}
				users={users}
				loadingPost={loadingPost}
				loadingUsers={loadingUsers}
			/>
		</div>
	);
};

export default connect(
	({ sample, loading }) => ({
		post: sample.post,
		users: sample.users,
		loadingPost: loading['sample/GET_POST'],
		loadingUsers: loading['sample/GET_USERS'],
	}),
	{
		getPost,
		getUsers,
	}
)(SampleContainer);
