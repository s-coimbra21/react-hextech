import { configure } from '@kadira/storybook';

import './index.css';

function loadStories() {
  require('../stories/Button.js');
  require('../stories/Checkbox.js');
  require('../stories/Dropdown.js');
  require('../stories/TextInput.js');
  require('../stories/RadioInput.js');
  require('../stories/SliderInput.js');
  require('../stories/Frame.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
