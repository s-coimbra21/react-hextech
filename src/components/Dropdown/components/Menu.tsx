import styledComponents, { css } from 'styled-components';

const visible = css`
	max-height: 240px;
	opacity: 1;
	overflow-y: auto;
`;

const Menu = styled.div.attrs(({ isHidden }) => ({
	role: 'listbox',
	'aria-hidden': isHidden,
}))`
	position: absolute;
	transition: max-height 0.4s ease, opacity 0.2s ease;
	top: 100%;
	width: 100%;
	max-height: 0px;
	overflow-y: hidden;
	overflow-x: hidden;
	background: #010a13;
	opacity: 0;
	border: 1px solid #453617;
	border-top: none;
	z-index: 10;

	${props => !props.isHidden && visible}
`;

export default Menu;
