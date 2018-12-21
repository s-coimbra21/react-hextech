import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Dropdown as BaseDropdown, stateful } from '../src';

const Dropdown = stateful(BaseDropdown);

const options = ['Jinx', 'Leona', 'Renekton', 'Quinn'];
const lotsOptions = [
  ...options,
  'Anivia',
  'Tristana',
  'Fiora',
  'Vayne',
  'Tryndamere',
  'Yasuo',
  'Poppy',
  'Diana'
];

storiesOf('Dropdown', module)
  .add('normal', () => (
    <Dropdown
      hocClassName="dropdown-wrapper"
      onChange={action('dropdown-change')}
      onBlur={action('dropdown-blur')}
      options={options}
    />
  ))
  .add('transparent', () => (
    <Dropdown
      onChange={action('dropdown-change')}
      onBlur={action('dropdown-blur')}
      options={options}
      transparent
    />
  ))
  .add('with scroll [TODO]', () => (
    <Dropdown
      hocClassName="dropdown-wrapper"
      onChange={action('dropdown-change')}
      onBlur={action('dropdown-blur')}
      options={lotsOptions}
    />
  ))
  .add('disabled [TODO]', () => (
    <Dropdown
      hocClassName="dropdown-wrapper"
      disabled
      onChange={action('dropdown-change')}
      onBlur={action('dropdown-blur')}
      options={options}
    />
  ));
