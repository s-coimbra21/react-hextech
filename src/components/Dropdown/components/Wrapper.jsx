import styled, { css } from 'styled-components';

import Control from './Control';
import Arrow from './Arrow';

const focus = css`
  background: linear-gradient(
    to top,
    rgba(88, 83, 66, 0.5),
    rgba(30, 35, 40, 0.5)
  );
  border: 1px solid transparent;
  border-image: linear-gradient(to top, #c89b3c, #f0e6d2) 1;
`;

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

const Wrapper = styled.div.attrs(
  ({ disabled: isDisabled, tabIndex, isOpen }) => ({
    tabIndex: isDisabled ? '-1' : tabIndex,
    role: 'combobox',
    'aria-expanded': isOpen,
    'aria-disabled': isDisabled
  })
)`
  display: block;
  position: relative;
  cursor: pointer;
  width: 100%;
  font-family: 'Spiegel';
  color: ${({ theme }) => theme.hextech.textDark};
  letter-spacing: 0.025rem;
  outline: none;

  &,
  & div {
    box-sizing: border-box;
    margin: 0;
  }

  &:focus ${Control}, ${Control}:hover {
    ${focus}
  }

  ${props => props.disabled && disabled}
`;

export default Wrapper;
