import React from 'react';
import classnames from 'classnames/bind';
import styled from 'styled-components';

import style from '../index.m.scss';

const cx = classnames.bind(style);

const DefaultLink = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Item = ({ item, active, onClick }) => (
  <li className={cx('item', { active })}>
    <span>{item.label}</span>
    <DefaultLink href={item.to} {...item} onClick={() => onClick(item)} />
  </li>
);
