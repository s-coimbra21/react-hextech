import styled from 'styled-components';

import { t } from '@theme';

interface IconProps {
  color?: string;
  imageSrc: string;
}

export const Icon = styled.div<IconProps>`
  background-color: ${({ color = t.gunmetal }) => color};
  background-image: url(${({ imageSrc = '' }) => imageSrc});
  background-position: 50%;
  background-size: 60%;
  background-repeat: no-repeat;

  width: 28px;
  height: 28px;
`;
