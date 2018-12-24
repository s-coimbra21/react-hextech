import React from 'react';
import styledComponents from 'styled-components';

const ArrowSvg = props => (
	<svg
		{...props}
		id="up-down-arrow"
		xmlns="http://www.w3.org/2000/svg"
		x="0px"
		y="0px"
		viewBox="0 0 100 100"
		enableBackground="new 0 0 100 100"
	>
		<polygon points="23.5,30.1 29.8,36.4 50,16.3 70.2,36.4 76.5,30.1 50,3.6 " />
		<polygon points="76.5,69.7 70.2,63.4 49.6,83.9 29.8,64.1 23.5,70.5 49.6,96.6 " />
	</svg>
);

const Arrow = styled(ArrowSvg)`
	fill: #c8aa6e;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 9px;
	margin: auto;
	cursor: pointer;
	height: 1em;
`;

export default Arrow;
