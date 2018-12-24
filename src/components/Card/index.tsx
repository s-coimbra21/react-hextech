import React from 'react';

import Badge from '../Badge';

import * as S from './styled';

const Card = ({ badge = {} }) => (
	<S.Wrapper>
		<a>
			<S.Background />
			<S.Overlay />
			<S.Flare />
			<S.Border />
			<S.Labels>
				<h4>Test</h4>
				<h3>Hello World</h3>
				<S.Description>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
						imperdiet, mi eu sodales mattis, ante nisi sagittis orci.
					</p>
				</S.Description>
			</S.Labels>
			<S.Attributes>
				<Badge type="story" {...badge}>
					Story
				</Badge>
			</S.Attributes>
		</a>
	</S.Wrapper>
);

export default Card;
