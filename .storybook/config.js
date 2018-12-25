import React from 'react';
import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import './index.css';
import theme from '../src/theme';

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
