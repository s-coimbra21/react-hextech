import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const storyPng = require('@assets/icons/story.png');
const mediaPng = require('@assets/icons/media.png');
const comicPng = require('@assets/icons/comic.png');

export const icons = {
  story: {
    imageSrc: storyPng,
    color: 'rgb(30, 130, 90)',
  },
  media: {
    imageSrc: mediaPng,
    color: 'rgb(190, 30, 55)',
  },
  comic: {
    imageSrc: comicPng,
    color: 'rgb(119, 10, 89)',
  },
};

const Icon = ({ name, ...iconProps }) => {
  const icon = name ? icons[name] : iconProps;

  return <S.Icon {...icon} />;
};

Icon.styled = S.Icon;

Icon.propTypes = {
  name: PropTypes.string,
  imageSrc: PropTypes.string,
  color: PropTypes.string,
};

export default Icon;
