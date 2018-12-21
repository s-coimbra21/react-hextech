import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Badge } from '../src';

storiesOf('Badge', module).add('with text', () => (
  <Badge onClick={action('badge-click')} />
));
