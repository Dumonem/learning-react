import React from 'react';
import Responsive from '../components/common/Responsive';
import WriteActionsButtons from '../components/write/WriteActionsButtons';
import EditorContainer from '../components/write/EditorContainer';
import TagBoxContainer from '../components/write/TagBoxContainer';

const WritePage = () => {
	return (
		<Responsive>
			<EditorContainer />
			<TagBoxContainer />
			<WriteActionsButtons />
		</Responsive>
	);
};

export default WritePage;
