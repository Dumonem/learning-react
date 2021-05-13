import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../components/write/EditorContainer';
import TagBoxContainer from '../components/write/TagBoxContainer';
import WriteActionsButtonsContainer from '../components/write/WriteActionsButtonsContainer';

const WritePage = () => {
	return (
		<Responsive>
			<EditorContainer />
			<TagBoxContainer />
			<WriteActionsButtonsContainer />
		</Responsive>
	);
};

export default WritePage;
