import { configure } from '@kadira/storybook';

import './index.css';

function loadStories() {
  require('../stories/Button.js');
  require('../stories/Checkbox.js');
  require('../stories/Dropdown.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
