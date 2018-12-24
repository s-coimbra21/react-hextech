import React from "react";
import Icons from "../Icons";
import * as S from "./styled";
interface BadgeProps {
  type?: string;
  imageSrc?: string;
  color?: string;
  text?: string;
}
const Badge: React.SFC<BadgeProps> = ({
  type,
  imageSrc,
  color,
  text,
  children
}) => (
  <S.Wrapper>
    <Icon name={type} imageSrc={imageSrc} color={color} />
    {(text || children) && <S.Text>{text || children}</S.Text>}
  </S.Wrapper>
);
export default Badge;
