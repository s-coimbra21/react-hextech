import React from 'react';
import styled from 'styled-components';

const Li = styled.li`
  position: relative;
  list-style: none;
  text-transform: capitalize;
  padding: 20px 14px;
  color: ${({ active }) => (active ? '#f0e6d3' : '#ccbd93')};
  transition: color 0.4s ease;
  letter-spacing: 0.2px;
`;

const DefaultLink = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Item = ({ item, active, onClick }) => (
  <Li active={active}>
    <span>{item.label}</span>
    <DefaultLink href={item.to} {...item} onClick={() => onClick(item)} />
  </Li>
);

export default Item;
