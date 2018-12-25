import React from 'react';

import Icon, { icons } from '../Icons';
import * as S from './styled';

type IconProps =
  | {
      type: keyof typeof icons;
    }
  | {
      type: void;
      imageSrc?: string;
      color?: string;
    };

type BadgeProps = {
  text?: string;
} & IconProps;

const Badge: React.FC<BadgeProps> = ({
  type,
  text,
  children,
  ...iconProps
}) => (
  <S.Wrapper>
    <Icon name={type as any} {...iconProps} />
    {(text || children) && <S.Text>{text || children}</S.Text>}
  </S.Wrapper>
);

export default Badge;
