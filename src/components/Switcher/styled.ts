import styled from 'styled-components';

import { t } from '@theme';

export const Bar = styled.div<{ x: number; width: number }>`
  height: 2px;
  margin-top: -2px;
  transition: transform 0.4s ease, width 0.2s ease;
  background: ${t.borderInput};

  transform: ${({ x = 0 }) => `translateX(${x}px)`};
  width: ${({ width = 0 }) => width}px;
`;

export const List = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const Li = styled.li<{ active: boolean }>`
  position: relative;
  list-style: none;
  text-transform: capitalize;
  padding: 20px 14px;
  color: ${({ active }) => (active ? t.textLight : t.goldMedium)};
  transition: color 0.4s ease;
  letter-spacing: 0.2px;

  :hover {
    color: ${t.textLight};
  }
`;

export const Wrapper = styled.div`
  position: relative;
`;
