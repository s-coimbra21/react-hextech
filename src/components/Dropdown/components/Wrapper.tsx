import styled, { css } from 'styled-components';

import { t } from '@theme';

import Arrow from './Arrow';

const disabledStyles = css`
  pointer-events: none;
  cursor: default;
  color: ${t.textDisabled};

  .control {
    border-image: none;
    border-color: ${t.textDisabled};
    background-color: ${t.gunmetal};

    ${Arrow} {
      fill: ${t.textDisabled};
    }
  }
`;

const Wrapper = styled.div.attrs(({ disabled, open }) => ({
  role: 'combobox',
  'aria-expanded': open,
  'aria-disabled': disabled,
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

  ${({ disabled }) => disabled && disabledStyles}
`;

export default Wrapper;
