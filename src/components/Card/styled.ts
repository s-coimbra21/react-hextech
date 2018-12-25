import styled from 'styled-components';
import { transparentize } from 'polished';

import { t } from '@theme';

const overlay = require('@assets/card-overlay.png');
const flare = require('@assets/card-flare.png');

export const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-attachment: local;
  background-color: #0a0a0c;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  transition: filter 0.5s ease, opacity 0.5s ease;
  z-index: 1;

  background-image: url('http://am-a.akamaihd.net/image?f=https%3A%2F%2Funiverse-meeps.leagueoflegends.com%2Fv1%2Fassets%2Fimages%2Faudio-drama-bg.jpg&resize=:810');
  background-position: 0% 0%;
  opacity: 1;
`;

export const Overlay = styled.div`
  position: absolute;
  bottom: -6px;
  left: -6px;
  right: -6px;
  top: -6px;
  background-image: url(${overlay});
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 2;
`;

export const Flare = styled.div`
  position: absolute;
  bottom: -6px;
  left: -6px;
  right: -6px;
  top: -6px;
  background-image: url(${flare});
  opacity: 0;
  transition: opacity 0.4s ease;
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 3;
`;

export const Border = styled.div`
  position: absolute;
  bottom: -1px;
  left: -1px;
  right: -1px;
  top: -1px;
  border-image-slice: 20;
  border-image-source: linear-gradient(180deg, #efe5d4 0, #c69b4b);
  border-style: solid;
  border-width: 2px;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 6;
`;

export const Labels = styled.div`
  position: absolute;
  bottom: 66px;
  left: 0;
  padding: 20px;
  padding-bottom: 0;
  right: 0;
  transition: transform 0.8s ease;
  z-index: 3;

  h3,
  h4 {
    letter-spacing: 1px;
    text-align: left;
    transition: color 0.4s ease;
    font-weight: 700;
  }

  h3 {
    font-family: 'Beaufort', Arial, sans-serif;
    color: #f0e6d2;
    font-size: 24px;
    line-height: 1.167;
    text-transform: uppercase;
    width: 100%;
  }

  h4 {
    font-family: 'Spiegel', Helvetica, sans-serif;
    color: #cdbd91;
    font-size: 14px;
    line-height: 1.143;
    padding-bottom: 8px;
    text-transform: capitalize;
  }
`;

export const Attributes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  padding-top: 22px;
  z-index: 4;
`;

export const Description = styled.div`
  height: 0%;
  max-height: 0;
  opacity: 0;
  transition: opacity 0.25s linear, max-height 1.4s cubic-bezier(0, 0, 0, 1);

  p {
    font-family: 'Spiegel', Helvetica, sans-serif;
    font-weight: 400;
    color: #a09b8c;
    font-size: 12px;
    line-height: 1.333;
    padding: 14px 0 0;
    width: 100%;
  }
`;

export const Wrapper = styled.li`
  position: relative;
  user-select: none;
  list-style: none;
  cursor: pointer;
  overflow: hidden;
  /* width: 100%; */
  width: 25%;
  height: 370px;
  border: 1px solid ${transparentize(0.2, t.gunmetal)};
  box-shadow: 0 0 40px 0 #000;
  transition: border-color 0.4s ease;

  &:hover,
  &:focus {
    ${Border}, ${Flare} {
      opacity: 1;
    }

    ${Description} {
      height: auto;
      max-height: 120px;
      opacity: 1;
    }
  }

  &:active {
    border-color: ${t.borderDark};

    ${Border} {
      opacity: 0;
    }

    ${Labels} h3 {
      color: ${t.borderInput};
    }
  }
`;
