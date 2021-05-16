import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost, writePost } from '../../modules/write';
import WriteActionsButtons from '../../components/write/WriteActionsButtons';

const WriteActionsButtonsContainer = ({ history }) => {
	const dispatch = useDispatch();
	const { title, body, tags, post, postError, originalPostId } = useSelector(
		({ write }) => ({
			title: write.title,
			body: write.body,
			tags: write.tags,
			post: write.post,
			postError: write.postError,
			originalPostId: write.originalPostId,
		})
	);

	const onPublish = () => {
		if (originalPostId) {
			dispatch(updatePost({ title, body, tags, id: originalPostId }));
			return;
		}
		dispatch(writePost({ title, body, tags }));
	};

	const onCancel = () => {
		history.goBack();
	};

	useEffect(() => {
		if (post) {
			const { _id, user } = post;
			history.push(`/@${user.username}/${_id}`);
		}
		if (postError) {
			console.log(postError);
		}
	}, [history, post, postError]);

	return (
		<WriteActionsButtons
			onPublish={onPublish}
			onCancel={onCancel}
			isEdit={!!originalPostId}
		/>
	);
};

export default withRouter(WriteActionsButtonsContainer);