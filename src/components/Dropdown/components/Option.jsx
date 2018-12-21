import styled, { css } from 'styled-components';

import check from './check.svg';

const focus = css`
  color: rgb(94.1%, 90.2%, 82.4%);
  background-color: rgb(11.8%, 13.7%, 15.7%);
`;

const selected = css`
  padding-right: 1.25em;
  padding-right: calc(1.25em + 10px);

  ::after {
    content: '';
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    background: url(${check}) center no-repeat;
    width: 1.25em;
    margin: auto;
  }
`;

const Option = styled.div.attrs(props => ({
  role: 'options',
  'aria-selected': props.isSelected
}))`
  position: relative;
  cursor: pointer;
  overflow-x: hidden;
  padding: 10px 14px;
  padding-right: 0;
  height: 40px;
  border-top: 1px solid rgb(12.2%, 12.9%, 13.7%);
  text-overflow: ellipsis;
  white-space: nowrap;

  ${props => props.focused && focus}
  ${props => props.selected && selected}

  :active {
    color: rgb(27.5%, 21.6%, 7.8%);
    background-color: rgba(30, 35, 40, 0.5);
  }
`;

export default Option;
