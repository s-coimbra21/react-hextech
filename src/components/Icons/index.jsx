import React from 'react';
import PropTypes from 'prop-types';

import story from '@assets/icons/story.png';
import media from '@assets/icons/media.png';
import comic from '@assets/icons/comic.png';

import * as S from './styled';

export const icons = {
  story: {
    imageSrc: story,
    color: 'rgb(30, 130, 90)',
  },
  media: {
    imageSrc: media,
    color: 'rgb(190, 30, 55)',
  },
  comic: {
    imageSrc: comic,
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
