import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
	border: none;
	border-radius: 4px;
	font-size: 1rem;
	font-weight: bold;
	padding: 0.25rem 1rem;
	color: white;
	outline: none;
	cursor: pointer;

	background: ${palette.gray[8]};
	&:hover {
		background: ${palette.gray[6]};
	}

	${(props) =>
		props.fullWidth &&
		css`
			padding: 0.75rem 0;
			width: 100%;
			font-size: 1.125rem;
		`}
	${(props) =>
		props.cyan &&
		css`
			background: ${palette.cyan[5]};
			&:hover {
				background: ${palette.cyan[7]};
			}
		`}
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
