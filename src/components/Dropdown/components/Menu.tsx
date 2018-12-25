import styled, { css } from 'styled-components';

const visible = css`
  max-height: 240px;
  opacity: 1;
  overflow-y: auto;
`;

const Menu = styled.div.attrs(({ hidden }) => ({
  role: 'listbox',
  'aria-hidden': hidden,
}))`
  position: absolute;
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
  transition: all 0.4s ease;

  ${({ hidden }) => !hidden && visible}
`;

export default Menu;
