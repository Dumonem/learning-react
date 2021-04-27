import React from 'react';
import './TodoListItem.scss';
import cn from 'classnames';
import {
	MdCheckBox,
	MdCheckBoxOutlineBlank,
	MdRemoveCircleOutline,
} from 'react-icons/all';

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
	const { id, text, checked } = todo;
	return (
		<div className="TodoListItem-virtualized" style={style}>
			<div className="TodoListItem">
				<div
					className={cn('checkBox', { checked })}
					onClick={() => {
						onToggle(id);
					}}
				>
					{checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
					<div className="text">{text}</div>
				</div>
				<div
					className="remove"
					onClick={() => {
						onRemove(id);
					}}
				>
					<MdRemoveCircleOutline />
				</div>
			</div>
		</div>
	);
};

export default React.memo(TodoListItem);
