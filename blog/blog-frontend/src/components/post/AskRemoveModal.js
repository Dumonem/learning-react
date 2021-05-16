import React from 'react';
import AskModal from '../common/AskModal';

const AskRemoveModal = ({ visible, onConfirm, onCancel }) => {
	return (
		<AskModal
			visible={visible}
			onCancel={onCancel}
			onConfirm={onConfirm}
			title="포스트삭제"
			confirmText="삭제"
		/>
	);
};

export default AskRemoveModal;
