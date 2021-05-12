import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteActionsButtonsBlock = styled.div`
	margin-top: 1rem;
	margin-bottom: 3rem;
	button + button {
		margin-left: 0.5rem;
	}
`;

const StyledButton = styled(Button)`
	height: 2.125rem;
	& + & {
		margin-left: 0.5rem;
	}
`;

const WriteActionsButtons = ({ onCancel, onPublish }) => {
	return (
		<WriteActionsButtonsBlock>
			<StyledButton cyan onClick={onPublish}>
				포스트 등록
			</StyledButton>
			<StyledButton onClick={onCancel}>취소</StyledButton>
		</WriteActionsButtonsBlock>
	);
};

export default WriteActionsButtons;
