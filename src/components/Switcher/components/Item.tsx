import React from 'react';
import styledComponents from 'styled-components';

import { Li } from '../styled';

const DefaultLink = styled.a`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
`;

export const Item = ({ item, active, onClick }) => (
	<Li active={active}>
		<span>{item.label}</span>
		<DefaultLink href={item.to} {...item} onClick={() => onClick(item)} />
	</Li>
);
