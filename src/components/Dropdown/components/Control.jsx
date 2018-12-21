import React from 'react';
import styled, { css } from 'styled-components';

import Arrow from './Arrow';

const background = css`
  ${({ theme }) => theme.hextech.bgDark}
`;

const active = css`
  color: #463714;
  border: 1px solid #463714;
  border-image: none;
`;

const focus = css`
  background: linear-gradient(
    to top,
    rgba(88, 83, 66, 0.5),
    rgba(30, 35, 40, 0.5)
  );
  border: 1px solid transparent;
  border-image: linear-gradient(to top, #c89b3c, #f0e6d2) 1;
`;

const transparentStyles = css`
  background: transparent;
  border: 1px solid transparent;
  border-bottom: none;
  transition: all 0.2s ease;

  ${props =>
    props.isOpen &&
    css`
      border: 1px solid #453617;
      border-bottom: none;
      background: #010a13;
    `}
`;

const Control = styled.div.attrs(({ value, isDisabled, tabIndex }) => ({
  children: [value ? value.label : 'Select...', <Arrow key={'arrow'} />],
  tabIndex: isDisabled ? '-1' : tabIndex,
}))`
  user-select: none;
  outline: none;
  background: ${background};
  padding: 10px 14px;
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

  :hover,
  :focus {
    ${({ isOpen, transparent }) => !isOpen && !transparent && focus}
    ${({ isOpen, transparent }) => !isOpen && !transparent && focus}
  }

  :active {
    ${({ transparent }) => !transparent && active}
  }

  ${({ isOpen, transparent }) => isOpen && !transparent && active}
  ${props => props.transparent && transparentStyles}
`;

export default Control;
