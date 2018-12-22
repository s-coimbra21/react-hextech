import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icons';

import * as S from './styled';

const Badge = ({ type, imageSrc, color, text, children }) => (
  <S.Wrapper>
    <Icon name={type} imageSrc={imageSrc} color={color} />
    {(text || children) && <S.Text>{text || children}</S.Text>}
  </S.Wrapper>
);

Badge.propTypes = {
  type: PropTypes.string,
  imageSrc: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.node,
};

export default Badge;
