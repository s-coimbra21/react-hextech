import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Switcher as BaseSwitcher, stateful } from '../src';

const Switcher = stateful(BaseSwitcher);

const options = ['Jinx', 'Leona', 'Renekton', 'Quinn'].map(label => ({
  label,
  value: label,
}));

storiesOf('Switcher', module).add('normal', () => (
  <Switcher
    hocClassName="Switcher-wrapper"
    onChange={action('switcher-change')}
    onBlur={action('switcher-blur')}
    items={options}
    initialValue={options[2]}
  />
));
