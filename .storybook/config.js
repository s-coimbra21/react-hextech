import { configure } from '@kadira/storybook';

import './index.css';

import { setOptions } from '@kadira/storybook-addon-options';

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
  require('../stories/Button.js');
  require('../stories/Checkbox.js');
  require('../stories/Dropdown.js');
  require('../stories/TextInput.js');
  require('../stories/RadioInput.js');
  require('../stories/SliderInput.js');
  require('../stories/Frame.js');
  require('../stories/Todo.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
