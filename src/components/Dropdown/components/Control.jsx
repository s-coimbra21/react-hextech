import React from 'react';
import styled, { css } from 'styled-components';

import Arrow from './Arrow';

const active = css`
  background: rgba(30, 35, 40, 0.5);
  color: #463714;
  border: 1px solid #463714;
`;

const Control = styled.div.attrs(({ value }) => ({
  children: [value ? value.label : 'Select...', <Arrow key={'arrow'} />],
  disabled: true
}))`
  padding: 10px 14px;
  background-color: rgba(30, 35, 40, 0.5);
  border: 1px solid transparent;
  border-image: linear-gradient(
      to top,
      #695625 0%,
      #a9852d 23%,
      #b88d35 93%,
      #c8aa6e 100%
    )
    1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${props => props.active && active}
  :active {
    ${active}
  }
`;

export default Control;
