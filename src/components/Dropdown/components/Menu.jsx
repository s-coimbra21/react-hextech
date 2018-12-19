import styled, { css } from 'styled-components';

import Option from './Control';

const hidden = css`
  max-height: 0px;
  border: 0;
  overflow: hidden;

  & > ${Option} {
    display: none;
  }
`;

const Menu = styled.div.attrs(({ hidden: isHidden }) => ({
  role: 'listbox',
  'aria-hidden': isHidden
}))`
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 237px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #010a13;
  border: 1px solid transparent;
  border-image: linear-gradient(to top, #695625, #463714) 1;
  z-index: 10;

  ${props => props.hidden && hidden}
`;

export default Menu;
