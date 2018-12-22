import styled from 'styled-components';

import { t } from '@theme';

import Icon from '../Icons';

export const Text = styled.h6`
  background-color: ${t.lightDark};
  border: 2px solid #3c3c41;
  border-left: none;
  overflow: hidden;
  padding: 6px 7px;

  font-family: 'Spiegel', Helvetica, sans-serif;
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 100%;
  text-transform: uppercase;
  font-size: 12px;
  color: #a09b8c;
  text-overflow: ellipsis;
  text-transform: capitalize;

  white-space: nowrap;
`;

export const Wrapper = styled.div`
  position: relative;
  max-height: 28px;
  overflow: hidden;

  ${Text}, ${Icon.styled} {
    display: inline-block;
  }
`;
