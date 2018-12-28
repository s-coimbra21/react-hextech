import React from 'react';
import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { checkA11y } from '@storybook/addon-a11y';

import './index.css';
import theme from '../src/theme';

addDecorator(checkA11y);
addDecorator(
  withBackgrounds([
    { name: 'LCU', value: 'var(--lcu-bg)', default: true },
    { name: 'Universe', value: 'var(--universe-bg)' },
    { name: 'twitter', value: '#00aced' },
  ])
);
// addDecorator(
//   withCssResources({
//     cssresources: [
//       // {
//       //   name: 'LCU',
//       //   code: `<style> body {background-image: var(--lcu-bg); } </style>`,
//       //   picked: true,
//       // },
//       {
//         name: 'Universe',
//         code: `<style> body {background-image: url(${require('../src/assets/universe-bg.jpg')}); } </style>`,
//       },
//     ],
//   })
// );

const Theme = storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
);

setOptions({
  name: 'React-Hextech',
  url: 'https://github.com/LeagueDevelopers/react-hextech',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: false,
});

function loadStories() {
  require('../stories/Badge.js');
  require('../stories/Button.js');
  require('../stories/Checkbox.jsx');
  require('../stories/Card.js');
  require('../stories/Dropdown.js');
  require('../stories/Switcher.js');
  require('../stories/TextInput.js');
  require('../stories/RadioInput.js');
  require('../stories/SliderInput.js');
  require('../stories/Frame.js');
  require('../stories/Todo.js');
  // You can require as many stories as you need.
}

addDecorator(Theme);

configure(loadStories, module);
