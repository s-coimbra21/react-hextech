import styled, { css } from 'styled-components';

import Control from './Control';
import Arrow from './Arrow';

const disabled = css`
  pointer-events: none;
  cursor: default;
  color: ${({ theme }) => theme.hextech.textDisabled};

  ${Control} {
    border-image: none;
    border-color: ${({ theme }) => theme.hextech.textDisabled};
    background-color: ${({ theme }) => theme.hextech.bgDisabled};

    ${Arrow} {
      fill: ${({ theme }) => theme.hextech.textDisabled};
    }
  }
`;

const Wrapper = styled.div.attrs(({ isDisabled, isOpen }) => ({
  role: 'combobox',
  'aria-expanded': isOpen,
  'aria-disabled': isDisabled,
}))`
  display: block;
  position: relative;
  cursor: pointer;
  width: 100%;
  min-width: 130px;
  font-family: 'Spiegel';
  color: rgb(80.4%, 74.5%, 56.9%);
  letter-spacing: 0.025rem;

  &,
  & div {
    box-sizing: border-box;
    margin: 0;
  }

  ${props => props.isDisabled && disabled}
`;

export default Wrapper;
