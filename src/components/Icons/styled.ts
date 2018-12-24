import styled from 'styled-components';

import { t } from '@theme';

export const Icon = styled.div.attrs(() => ({
  role: 'presentation',
}))`
  background-color: ${({ color = t.lightDark }) => color};
  background-image: url(${({ imageSrc }) => imageSrc});
  background-position: 50%;
  background-size: 60%;
  background-repeat: no-repeat;

  width: 28px;
  height: 28px;
`;
