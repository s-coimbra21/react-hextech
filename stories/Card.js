import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Card } from '../src';

storiesOf('Card', module).add('with text', () => (
  <Card onClick={action('card-click')} />
));
