import React from 'react';

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

type Icons = keyof typeof icons;

type IconProps =
  | {
      name: Icons;
    }
  | {
      name?: void;
      imageSrc: string;
      color?: string;
    };

type IconType = React.FC<IconProps> & { styled: typeof S.Icon };

const Icon: IconType = ({ name, ...iconProps }) => {
  const icon = name ? icons[name] : (iconProps as any);

  return <S.Icon role="presentation" {...icon} />;
};

Icon.styled = S.Icon;

export default Icon;
