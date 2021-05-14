import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unLoadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import { withRouter } from 'react-router-dom';

const PostViewerContainer = ({ match }) => {
	const { postId } = match.params;
	const dispatch = useDispatch();
	const { post, error, loading } = useSelector(({ post, loading }) => ({
		post: post.post,
		error: post.error,
		loading: loading['post/READ_POST'],
	}));

	useEffect(() => {
		dispatch(readPost(postId));
		//언마운트 될 때 리덕스에서 포스트 데이터 없애기
		return () => {
			dispatch(unLoadPost());
		};
	}, [dispatch, postId]);

	return <PostViewer post={post} loading={loading} error={error} />;
};

export default withRouter(PostViewerContainer);
