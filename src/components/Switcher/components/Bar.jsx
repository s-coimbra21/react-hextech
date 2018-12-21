import styled from 'styled-components';

const Bar = styled.div`
  height: 2px;
  margin-top: -2px;
  transition: transform 0.4s ease, width 0.2s ease;
  background: #77592c;

  transform: ${({ x = 0 }) => `translateX(${x}px)`};
  width: ${({ width = 0 }) => width}px;
`;

export default Bar;
