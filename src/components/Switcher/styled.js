import styled from 'styled-components';

export const Bar = styled.div`
  height: 2px;
  margin-top: -2px;
  transition: transform 0.4s ease, width 0.2s ease;
  background: #77592c;

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

export const Li = styled.li`
  position: relative;
  list-style: none;
  text-transform: capitalize;
  padding: 20px 14px;
  color: ${({ active }) => (active ? '#f0e6d3' : '#ccbd93')};
  transition: color 0.4s ease;
  letter-spacing: 0.2px;
`;

export const Wrapper = styled.div`
  position: relative;
`;
