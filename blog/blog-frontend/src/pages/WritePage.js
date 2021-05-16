import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionsButtonsContainer from '../containers/write/WriteActionsButtonsContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
	return (
		<>
			<Helmet>
				<title>글 작성하기 - REACTERS</title>
			</Helmet>
			<Responsive>
				<EditorContainer />
				<TagBoxContainer />
				<WriteActionsButtonsContainer />
			</Responsive>
		</>
	);
};

export default WritePage;
